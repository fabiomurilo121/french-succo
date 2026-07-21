using FrenchSucco.Api.Data;
using FrenchSucco.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/stories")]
public class StoriesController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<StoriesController> _logger;

    public StoriesController(AppDbContext db, ILogger<StoriesController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Lista resumida das histórias (sem frases / vocabulário).
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<StorySummaryDto>>> List(CancellationToken ct)
    {
        var stories = await _db.Stories
            .AsNoTracking()
            .OrderBy(s => s.OrderIndex)
            .Select(s => new StorySummaryDto(
                s.Id,
                s.Slug,
                s.Title,
                s.Subtitle,
                s.Icon,
                s.Cover,
                s.HeroId,
                s.OrderIndex,
                s.Phrases.Count))
            .ToListAsync(ct);
        return Ok(stories);
    }

    /// <summary>
    /// Retorna a história completa com frases e vocabulário.
    /// </summary>
    [HttpGet("{slug}")]
    public async Task<ActionResult<StoryDto>> Get(string slug, CancellationToken ct)
    {
        var story = await _db.Stories
            .AsNoTracking()
            .Include(s => s.Phrases.OrderBy(p => p.OrderIndex))
            .Include(s => s.Vocabulary.OrderBy(v => v.OrderIndex))
            .FirstOrDefaultAsync(s => s.Slug == slug, ct);

        if (story == null)
            return NotFound(new { message = "História não encontrada." });

        var dto = new StoryDto(
            story.Id,
            story.Slug,
            story.Title,
            story.Subtitle,
            story.Icon,
            story.Cover,
            story.HeroId,
            story.Narrative,
            story.OrderIndex,
            story.Phrases.Select(p => new StoryPhraseDto(p.Id, p.OrderIndex, p.Fr, p.Pt, p.SceneId)).ToList(),
            story.Vocabulary.Select(v => new StoryVocabularyDto(v.Id, v.OrderIndex, v.Fr, v.Pt)).ToList());
        return Ok(dto);
    }
}

[ApiController]
[Route("api/words")]
public class WordsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<WordsController> _logger;

    public WordsController(AppDbContext db, ILogger<WordsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Dicionário completo para tradução instantânea no front.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<List<WordLookupDto>>> List(CancellationToken ct)
    {
        var words = await _db.Words
            .AsNoTracking()
            .Select(w => new WordLookupDto(w.Word, w.Translation))
            .ToListAsync(ct);
        return Ok(words);
    }
}