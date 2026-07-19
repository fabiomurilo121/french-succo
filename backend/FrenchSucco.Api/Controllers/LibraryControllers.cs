using FrenchSucco.Api.Data;
using FrenchSucco.Api.Dtos;
using FrenchSucco.Api.Models;
using FrenchSucco.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/history")]
public class HistoryController : ControllerBase
{
    private readonly AppDbContext _db;
    private const string DefaultUserId = "default";

    public HistoryController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<HistoryItemDto>>> List(CancellationToken ct)
    {
        var items = await _db.History
            .Where(h => h.UserId == DefaultUserId)
            .OrderByDescending(h => h.CreatedAt)
            .Take(100)
            .Select(h => new HistoryItemDto(
                h.Id, h.SourceLang, h.SourceText, h.FrText,
                h.Phonetic, h.Category, h.Mode, h.CreatedAt))
            .ToListAsync(ct);
        return Ok(items);
    }

    [HttpPost]
    public async Task<ActionResult<HistoryItemDto>> Create(
        [FromBody] HistoryItemDto input,
        CancellationToken ct)
    {
        var entity = new TranslationItem
        {
            UserId = DefaultUserId,
            SourceLang = input.SourceLang,
            SourceText = input.SourceText,
            FrText = input.FrText,
            Phonetic = input.Phonetic,
            Category = input.Category ?? "Comum",
            Mode = input.Mode ?? "translate",
            CreatedAt = DateTime.UtcNow
        };
        _db.History.Add(entity);
        await _db.SaveChangesAsync(ct);

        return CreatedAtAction(nameof(List), new { id = entity.Id }, new HistoryItemDto(
            entity.Id, entity.SourceLang, entity.SourceText, entity.FrText,
            entity.Phonetic, entity.Category, entity.Mode, entity.CreatedAt));
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id, CancellationToken ct)
    {
        var entity = await _db.History.FirstOrDefaultAsync(h => h.Id == id, ct);
        if (entity is null) return NotFound();
        _db.History.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Clear(CancellationToken ct)
    {
        var all = _db.History.Where(h => h.UserId == DefaultUserId);
        _db.History.RemoveRange(all);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }
}

[ApiController]
[Route("api/favorites")]
public class FavoritesController : ControllerBase
{
    private readonly AppDbContext _db;
    private const string DefaultUserId = "default";

    public FavoritesController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<FavoriteDto>>> List(CancellationToken ct)
    {
        var items = await _db.Favorites
            .Where(f => f.UserId == DefaultUserId)
            .OrderByDescending(f => f.SavedAt)
            .Select(f => new FavoriteDto(
                f.Id, f.FrText, f.PtText, f.Phonetic, f.Category, f.SavedAt))
            .ToListAsync(ct);
        return Ok(items);
    }

    public record CreateFavoriteRequest(string FrText, string? PtText, string? Phonetic, string? Category);

    [HttpPost]
    public async Task<ActionResult<FavoriteDto>> Create(
        [FromBody] CreateFavoriteRequest req,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.FrText))
            return BadRequest(new { message = "FrText é obrigatório." });

        var existing = await _db.Favorites.FirstOrDefaultAsync(
            f => f.UserId == DefaultUserId && f.FrText == req.FrText, ct);
        if (existing is not null) return Conflict(new { message = "Já favoritado." });

        var entity = new FavoriteItem
        {
            UserId = DefaultUserId,
            FrText = req.FrText,
            PtText = req.PtText,
            Phonetic = req.Phonetic,
            Category = req.Category ?? "Comum",
            SavedAt = DateTime.UtcNow
        };
        _db.Favorites.Add(entity);
        await _db.SaveChangesAsync(ct);

        return Ok(new FavoriteDto(
            entity.Id, entity.FrText, entity.PtText,
            entity.Phonetic, entity.Category, entity.SavedAt));
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id, CancellationToken ct)
    {
        var entity = await _db.Favorites.FirstOrDefaultAsync(f => f.Id == id, ct);
        if (entity is null) return NotFound();
        _db.Favorites.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }
}

[ApiController]
[Route("api/settings")]
public class SettingsController : ControllerBase
{
    private readonly AppDbContext _db;
    private const string DefaultUserId = "default";

    public SettingsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<SettingsDto>> Get(CancellationToken ct)
    {
        var settings = await _db.UserSettings
            .FirstOrDefaultAsync(s => s.UserId == DefaultUserId, ct);

        if (settings is null)
        {
            settings = new UserSettings { UserId = DefaultUserId };
            _db.UserSettings.Add(settings);
            await _db.SaveChangesAsync(ct);
        }

        return Ok(MapToDto(settings));
    }

    [HttpPut]
    public async Task<ActionResult<SettingsDto>> Update(
        [FromBody] SettingsDto dto,
        CancellationToken ct)
    {
        var settings = await _db.UserSettings
            .FirstOrDefaultAsync(s => s.UserId == DefaultUserId, ct);

        if (settings is null)
        {
            settings = new UserSettings { UserId = DefaultUserId };
            _db.UserSettings.Add(settings);
        }

        settings.Voice = dto.Voice;
        settings.Speed = dto.Speed;
        settings.Region = dto.Region;
        settings.AutoPlay = dto.AutoPlay;
        settings.ShowPhonetic = dto.ShowPhonetic;
        settings.HighlightVerbs = dto.HighlightVerbs;
        settings.DailyReminder = dto.DailyReminder;
        settings.ReminderTime = dto.ReminderTime;
        settings.HideExplanations = dto.HideExplanations;

        await _db.SaveChangesAsync(ct);
        return Ok(MapToDto(settings));
    }

    private static SettingsDto MapToDto(UserSettings s) => new(
        s.Voice, s.Speed, s.Region, s.AutoPlay, s.ShowPhonetic,
        s.HighlightVerbs, s.DailyReminder, s.ReminderTime, s.HideExplanations);
}

[ApiController]
[Route("api/stats")]
public class StatsController : ControllerBase
{
    private readonly IStatsService _stats;
    private const string DefaultUserId = "default";

    public StatsController(IStatsService stats) => _stats = stats;

    [HttpGet]
    public async Task<ActionResult<StatsDto>> Get(CancellationToken ct)
    {
        var stats = await _stats.GetStatsAsync(DefaultUserId, ct);
        return Ok(stats);
    }
}
