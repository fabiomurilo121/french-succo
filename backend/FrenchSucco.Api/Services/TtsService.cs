using System.Security.Cryptography;
using System.Text;
using FrenchSucco.Api.Data;
using FrenchSucco.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Services;

public interface ITtsService
{
    Task<byte[]> SynthesizeAsync(string text, string voice, double speed, string region, CancellationToken ct = default);
}

public class TtsService : ITtsService
{
    private readonly IMiniMaxService _miniMax;
    private readonly AppDbContext _db;
    private readonly ILogger<TtsService> _logger;

    public TtsService(IMiniMaxService miniMax, AppDbContext db, ILogger<TtsService> logger)
    {
        _miniMax = miniMax;
        _db = db;
        _logger = logger;
    }

    public async Task<byte[]> SynthesizeAsync(string text, string voice, double speed, string region, CancellationToken ct = default)
    {
        var hash = ComputeHash(text, voice, speed, region);

        var cached = await _db.AudioCache.FirstOrDefaultAsync(a => a.Hash == hash, ct);
        if (cached != null)
        {
            cached.LastUsedAt = DateTime.UtcNow;
            cached.UseCount++;
            await _db.SaveChangesAsync(ct);
            _logger.LogDebug("Audio cache hit: {Hash} ({UseCount}x)", hash, cached.UseCount);
            return cached.AudioBytes;
        }

        var bytes = await _miniMax.SynthesizeSpeechAsync(text, voice, speed, region, ct);

        var entry = new AudioCacheEntry
        {
            Hash = hash,
            Text = text,
            Voice = voice,
            Speed = speed,
            Region = region,
            AudioBytes = bytes,
            BytesSize = bytes.Length,
            CreatedAt = DateTime.UtcNow,
            LastUsedAt = DateTime.UtcNow,
            UseCount = 1
        };
        _db.AudioCache.Add(entry);
        try
        {
            await _db.SaveChangesAsync(ct);
            _logger.LogInformation("Audio cache miss → saved {Bytes} bytes for hash {Hash}", bytes.Length, hash);
        }
        catch (DbUpdateException ex)
        {
            _logger.LogWarning(ex, "Failed to persist audio cache entry {Hash} (race condition?)", hash);
        }

        return bytes;
    }

    private static string ComputeHash(string text, string voice, double speed, string region)
    {
        var normalized = $"{(text ?? string.Empty).Trim().ToLowerInvariant()}|{voice}|{speed.ToString("F2", System.Globalization.CultureInfo.InvariantCulture)}|{region}";
        var bytes = Encoding.UTF8.GetBytes(normalized);
        var hash = SHA256.HashData(bytes);
        return Convert.ToHexString(hash).ToLowerInvariant();
    }
}
