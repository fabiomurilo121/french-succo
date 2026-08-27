using FrenchSucco.Api.Data;
using FrenchSucco.Api.Dtos;
using FrenchSucco.Api.Models;
using FrenchSucco.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/learned-words")]
public class LearnedWordsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILearnedWordsValidationService _validation;
    private readonly ILogger<LearnedWordsController> _logger;
    private const string DefaultUserId = "default";

    public LearnedWordsController(
        AppDbContext db,
        ILearnedWordsValidationService validation,
        ILogger<LearnedWordsController> logger)
    {
        _db = db;
        _validation = validation;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<List<LearnedWordDto>>> List(
        [FromQuery] string? category,
        [FromQuery] string? search,
        CancellationToken ct)
    {
        var query = _db.LearnedWords
            .Where(w => w.UserId == DefaultUserId);

        if (!string.IsNullOrWhiteSpace(category) && !string.Equals(category, "todas", StringComparison.OrdinalIgnoreCase))
        {
            var cat = category.Trim();
            query = query.Where(w => (w.Category ?? "").ToLower() == cat.ToLower());
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var term = search.Trim().ToLower();
            query = query.Where(w =>
                w.Word.ToLower().Contains(term) ||
                w.Translation.ToLower().Contains(term));
        }

        var items = await query
            .OrderByDescending(w => w.LearnedAt)
            .Select(w => new LearnedWordDto(
                w.Id, w.Word, w.Translation, w.Phonetic,
                w.Category, w.Notes, w.Context,
                w.ReviewCount, w.LastReviewedAt, w.LearnedAt))
            .ToListAsync(ct);

        return Ok(items);
    }

    [HttpGet("check")]
    public async Task<ActionResult<LearnedWordCheckResponse>> Check(
        [FromQuery] string word,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(word))
            return BadRequest(new { message = "Parâmetro 'word' é obrigatório." });

        var result = await _validation.ValidateAsync(DefaultUserId, word, ct);
        return Ok(result);
    }

    public record CreateLearnedWordRequestInternal(
        string Word,
        string Translation,
        string? Phonetic,
        string? Category,
        string? Notes,
        string? Context,
        bool? Force = false
    );

    [HttpPost]
    public async Task<ActionResult<LearnedWordDto>> Create(
        [FromBody] CreateLearnedWordRequestInternal req,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(req.Word))
            return BadRequest(new { message = "A palavra em francês é obrigatória." });

        if (string.IsNullOrWhiteSpace(req.Translation))
            return BadRequest(new { message = "A tradução em português é obrigatória." });

        var check = await _validation.ValidateAsync(DefaultUserId, req.Word, ct);
        var force = req.Force == true;

        if (!check.Validation.IsValid && !force)
        {
            return UnprocessableEntity(new
            {
                message = check.Validation.Reason ?? "Palavra inválida.",
                check
            });
        }

        if (check.Validation.IsDuplicate && check.Validation.DuplicateId.HasValue && !force)
        {
            return Conflict(new
            {
                message = check.Validation.Reason ?? "Palavra já existe no vocabulário.",
                duplicateId = check.Validation.DuplicateId,
                check
            });
        }

        var normalized = LearnedWordsValidationService.Normalize(req.Word);

        var entity = new LearnedWord
        {
            UserId = DefaultUserId,
            Word = req.Word.Trim(),
            WordNormalized = normalized,
            Translation = req.Translation.Trim(),
            Phonetic = string.IsNullOrWhiteSpace(req.Phonetic) ? null : req.Phonetic.Trim(),
            Category = string.IsNullOrWhiteSpace(req.Category) ? null : req.Category.Trim(),
            Notes = string.IsNullOrWhiteSpace(req.Notes) ? null : req.Notes.Trim(),
            Context = string.IsNullOrWhiteSpace(req.Context) ? null : req.Context.Trim(),
            ReviewCount = 0,
            LearnedAt = DateTime.UtcNow
        };

        try
        {
            _db.LearnedWords.Add(entity);
            await _db.SaveChangesAsync(ct);
        }
        catch (DbUpdateException ex)
        {
            _logger.LogWarning(ex, "Failed to insert learned word (likely duplicate)");
            var existing = await _db.LearnedWords.FirstOrDefaultAsync(
                w => w.UserId == DefaultUserId && w.WordNormalized == normalized, ct);
            if (existing is not null)
            {
                return Conflict(new
                {
                    message = $"Você já tem \"{existing.Word}\" no vocabulário.",
                    duplicateId = existing.Id
                });
            }
            throw;
        }

        return Ok(new LearnedWordDto(
            entity.Id, entity.Word, entity.Translation, entity.Phonetic,
            entity.Category, entity.Notes, entity.Context,
            entity.ReviewCount, entity.LastReviewedAt, entity.LearnedAt));
    }

    [HttpPatch("{id:long}/review")]
    public async Task<ActionResult<LearnedWordDto>> MarkReviewed(long id, CancellationToken ct)
    {
        var entity = await _db.LearnedWords.FirstOrDefaultAsync(
            w => w.Id == id && w.UserId == DefaultUserId, ct);
        if (entity is null) return NotFound();

        entity.ReviewCount += 1;
        entity.LastReviewedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync(ct);

        return Ok(new LearnedWordDto(
            entity.Id, entity.Word, entity.Translation, entity.Phonetic,
            entity.Category, entity.Notes, entity.Context,
            entity.ReviewCount, entity.LastReviewedAt, entity.LearnedAt));
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id, CancellationToken ct)
    {
        var entity = await _db.LearnedWords.FirstOrDefaultAsync(
            w => w.Id == id && w.UserId == DefaultUserId, ct);
        if (entity is null) return NotFound();
        _db.LearnedWords.Remove(entity);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    [HttpDelete]
    public async Task<IActionResult> Clear(CancellationToken ct)
    {
        var all = _db.LearnedWords.Where(w => w.UserId == DefaultUserId);
        _db.LearnedWords.RemoveRange(all);
        await _db.SaveChangesAsync(ct);
        return NoContent();
    }

    [HttpGet("categories")]
    public async Task<ActionResult<List<string>>> Categories(CancellationToken ct)
    {
        var cats = await _db.LearnedWords
            .Where(w => w.UserId == DefaultUserId && w.Category != null && w.Category != "")
            .Select(w => w.Category!)
            .Distinct()
            .OrderBy(c => c)
            .ToListAsync(ct);

        var withDefaults = new List<string> { "Todas" };
        withDefaults.AddRange(cats);
        return Ok(withDefaults);
    }
}
