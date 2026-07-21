using FrenchSucco.Api.Data;
using FrenchSucco.Api.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/database")]
public class DatabaseController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly ILogger<DatabaseController> _logger;

    public DatabaseController(AppDbContext db, ILogger<DatabaseController> logger)
    {
        _db = db;
        _logger = logger;
    }

    /// <summary>
    /// Retorna contagens por tabela e tamanho do banco.
    /// </summary>
    [HttpGet("stats")]
    public async Task<ActionResult<DatabaseStatsDto>> Stats(CancellationToken ct)
    {
        try
        {
            var wordCount = await _db.Words.CountAsync(ct);
            var storyCount = await _db.Stories.CountAsync(ct);
            var phraseCount = await _db.StoryPhrases.CountAsync(ct);
            var vocabCount = await _db.StoryVocabulary.CountAsync(ct);
            var historyCount = await _db.History.CountAsync(ct);
            var favoriteCount = await _db.Favorites.CountAsync(ct);

            var totalBytes = await _db.Database
                .SqlQueryRaw<long>("SELECT pg_database_size(current_database()) AS \"Value\"")
                .FirstAsync(ct);

            var tablesRaw = await _db.Database
                .SqlQueryRaw<TableSizeRow>(
                    @"SELECT table_name AS ""TableName"", pg_total_relation_size(quote_ident(table_name)) AS ""TotalBytes""
                      FROM information_schema.tables
                      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
                      ORDER BY pg_total_relation_size(quote_ident(table_name)) DESC")
                .ToListAsync(ct);

            return Ok(new DatabaseStatsDto(
                totalBytes,
                storyCount,
                phraseCount,
                vocabCount,
                wordCount,
                historyCount,
                favoriteCount,
                tablesRaw.Select(t => new TableSizeDto(t.TableName, t.TotalBytes)).ToList()
            ));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to compute database stats");
            return StatusCode(StatusCodes.Status500InternalServerError,
                new { message = "Não foi possível obter as estatísticas do banco." });
        }
    }

    private class TableSizeRow
    {
        public string TableName { get; set; } = string.Empty;
        public long TotalBytes { get; set; }
    }
}