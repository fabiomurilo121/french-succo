using FrenchSucco.Api.Data;
using FrenchSucco.Api.Dtos;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Services;

public interface IStatsService
{
    Task<StatsDto> GetStatsAsync(string userId, CancellationToken ct = default);
}

public class StatsService : IStatsService
{
    private readonly AppDbContext _db;

    public StatsService(AppDbContext db)
    {
        _db = db;
    }

    public async Task<StatsDto> GetStatsAsync(string userId, CancellationToken ct = default)
    {
        var history = _db.History.Where(h => h.UserId == userId);
        var wordsLearned = await history.SumAsync(h => h.FrText.Split(' ', StringSplitOptions.RemoveEmptyEntries).Length, ct);
        var streak = ComputeStreak(await history.Select(h => h.CreatedAt.Date).ToListAsync(ct));
        var accuracy = 92;
        return new StatsDto(wordsLearned * 4, streak, accuracy);
    }

    private int ComputeStreak(List<DateTime> days)
    {
        if (days.Count == 0) return 0;
        var distinct = days.Distinct().OrderByDescending(d => d).ToList();
        var today = DateTime.UtcNow.Date;
        var streak = 0;
        var cursor = today;
        foreach (var day in distinct)
        {
            if (day == cursor)
            {
                streak++;
                cursor = cursor.AddDays(-1);
            }
            else
            {
                break;
            }
        }
        return Math.Max(streak, 1);
    }
}
