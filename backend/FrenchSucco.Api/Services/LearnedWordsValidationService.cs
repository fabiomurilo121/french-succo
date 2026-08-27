using System.Globalization;
using System.Text;
using System.Text.Json;
using FrenchSucco.Api.Data;
using FrenchSucco.Api.Dtos;
using FrenchSucco.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Services;

public interface ILearnedWordsValidationService
{
    Task<LearnedWordCheckResponse> ValidateAsync(string userId, string word, CancellationToken ct = default);
    Task<UserSettings> GetEffectiveSettingsAsync(string userId, CancellationToken ct = default);
}

public class LearnedWordsValidationService : ILearnedWordsValidationService
{
    private readonly AppDbContext _db;
    private readonly IMiniMaxService _miniMax;
    private readonly ILogger<LearnedWordsValidationService> _logger;

    public LearnedWordsValidationService(
        AppDbContext db,
        IMiniMaxService miniMax,
        ILogger<LearnedWordsValidationService> logger)
    {
        _db = db;
        _miniMax = miniMax;
        _logger = logger;
    }

    public async Task<UserSettings> GetEffectiveSettingsAsync(string userId, CancellationToken ct = default)
    {
        var settings = await _db.UserSettings.FirstOrDefaultAsync(s => s.UserId == userId, ct);
        if (settings is null)
        {
            settings = new UserSettings { UserId = userId };
            _db.UserSettings.Add(settings);
            await _db.SaveChangesAsync(ct);
        }
        return settings;
    }

    public async Task<LearnedWordCheckResponse> ValidateAsync(string userId, string word, CancellationToken ct = default)
    {
        var trimmed = (word ?? string.Empty).Trim();
        var normalized = Normalize(trimmed);

        var validation = new LearnedWordValidationDto(
            IsValid: true,
            Reason: null,
            IsDuplicate: false,
            DuplicateId: null,
            Suggestions: new List<LearnedWordSuggestionDto>());

        var settings = await GetEffectiveSettingsAsync(userId, ct);

        if (string.IsNullOrEmpty(trimmed))
        {
            return new LearnedWordCheckResponse(trimmed, normalized,
                validation with { IsValid = false, Reason = "Palavra vazia." },
                false, false);
        }

        if (normalized.Length < 2)
        {
            return new LearnedWordCheckResponse(trimmed, normalized,
                validation with { IsValid = false, Reason = "A palavra precisa ter pelo menos 2 letras." },
                false, false);
        }

        if (!HasOnlyFrenchChars(normalized))
        {
            return new LearnedWordCheckResponse(trimmed, normalized,
                validation with { IsValid = false, Reason = "Use apenas letras, espaços, apóstrofos e hifens." },
                false, false);
        }

        if (HasSuspiciousPattern(normalized))
        {
            return new LearnedWordCheckResponse(trimmed, normalized,
                validation with
                {
                    IsValid = false,
                    Reason = "Padrão suspeito (letras repetidas ou sequência sem sentido)."
                },
                false, false);
        }

        bool inDictionary = false;
        bool inLearned = false;

        if (settings.ValidateWithDictionary)
        {
            inDictionary = await _db.Words.AnyAsync(
                w => w.Word.ToLower() == normalized, ct);
        }

        var duplicate = await _db.LearnedWords.AsNoTracking()
            .FirstOrDefaultAsync(w => w.UserId == userId && w.WordNormalized == normalized, ct);

        if (duplicate is not null)
        {
            inLearned = true;
            return new LearnedWordCheckResponse(trimmed, normalized,
                validation with
                {
                    IsDuplicate = true,
                    DuplicateId = duplicate.Id,
                    Reason = $"Você já tem \"{duplicate.Word}\" no seu vocabulário."
                },
                inDictionary, inLearned);
        }

        var suggestions = new List<LearnedWordSuggestionDto>();
        if (settings.ValidateWithLevenshtein)
        {
            suggestions.AddRange(await FindLevenshteinSuggestionsAsync(userId, normalized, ct));
        }

        string? aiReason = null;
        bool? aiValid = null;
        if (settings.ValidateWithAi)
        {
            (aiValid, aiReason) = await RunAiValidationAsync(trimmed, ct);
            if (aiValid == false && !string.IsNullOrEmpty(aiReason))
            {
                validation = validation with
                {
                    IsValid = false,
                    Reason = aiReason
                };
            }
        }

        return new LearnedWordCheckResponse(trimmed, normalized, validation, inDictionary, inLearned)
            with { Validation = validation with { Suggestions = suggestions } };
    }

    private async Task<List<LearnedWordSuggestionDto>> FindLevenshteinSuggestionsAsync(
        string userId, string normalized, CancellationToken ct)
    {
        const int MaxDistance = 2;
        const int MaxSuggestions = 5;

        var candidates = new List<LearnedWordSuggestionDto>();

        var learned = await _db.LearnedWords.AsNoTracking()
            .Where(w => w.UserId == userId)
            .Select(w => new { w.Id, w.Word, w.Translation })
            .ToListAsync(ct);

        foreach (var item in learned)
        {
            var d = Levenshtein(Normalize(item.Word), normalized);
            if (d > 0 && d <= MaxDistance)
            {
                candidates.Add(new LearnedWordSuggestionDto(
                    item.Id, item.Word, item.Translation, d,
                    $"Você já tem uma palavra parecida: \"{item.Word}\"."));
            }
        }

        return candidates
            .OrderBy(c => c.Distance)
            .ThenBy(c => c.Word.Length)
            .Take(MaxSuggestions)
            .ToList();
    }

    private async Task<(bool? valid, string? reason)> RunAiValidationAsync(string word, CancellationToken ct)
    {
        try
        {
            var systemPrompt =
                "Você é um assistente que valida se uma palavra parece ser uma palavra ou expressão francesa real e bem escrita. " +
                "Responda apenas com JSON válido no formato: {\"valid\": true|false, \"reason\": \"<explicação curta em pt-BR>\"}.";

            var userPrompt =
                $"A palavra abaixo parece ser uma palavra/expressão francesa válida e bem escrita?\n\n" +
                $"Palavra: \"{word}\"\n\n" +
                "Considere: ortografia correta, acentos apropriados, separações de palavras. " +
                "Se for uma sigla (ex: SNCF) ou nome próprio, considere válido. " +
                "Se houver erro ortográfico evidente, responda valid=false com a razão.";

            var raw = await _miniMax.CompleteChatAsync(systemPrompt, userPrompt, ct, jsonMode: true, maxTokens: 200);

            using var doc = JsonDocument.Parse(string.IsNullOrWhiteSpace(raw) ? "{}" : raw);
            var root = doc.RootElement;
            if (!root.TryGetProperty("valid", out var vEl))
            {
                return (null, null);
            }
            var valid = vEl.ValueKind == JsonValueKind.True;
            var reason = root.TryGetProperty("reason", out var rEl) ? rEl.GetString() : null;
            return (valid, reason);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "AI validation failed for word {Word}", word);
            return (null, null);
        }
    }

    public static string Normalize(string input)
    {
        if (string.IsNullOrWhiteSpace(input)) return string.Empty;
        var lower = input.Trim().ToLowerInvariant();
        var formD = lower.Normalize(NormalizationForm.FormD);
        var sb = new StringBuilder(formD.Length);
        foreach (var c in formD)
        {
            var cat = CharUnicodeInfo.GetUnicodeCategory(c);
            if (cat != UnicodeCategory.NonSpacingMark)
            {
                sb.Append(c);
            }
        }
        return sb.ToString().Normalize(NormalizationForm.FormC);
    }

    private static bool HasOnlyFrenchChars(string normalized)
    {
        foreach (var c in normalized)
        {
            if (char.IsLetter(c)) continue;
            if (c == ' ' || c == '\'' || c == '-' || c == '\u2019') continue;
            return false;
        }
        return true;
    }

    private static bool HasSuspiciousPattern(string normalized)
    {
        if (normalized.Length < 4) return false;
        int sameRun = 1;
        for (int i = 1; i < normalized.Length; i++)
        {
            if (normalized[i] == normalized[i - 1])
            {
                sameRun++;
                if (sameRun >= 4) return true;
            }
            else
            {
                sameRun = 1;
            }
        }

        const string keyboard = "qwertyuiopasdfghjklzxcvbnm";
        int consec = 0;
        foreach (var c in normalized)
        {
            if (c == ' ') { consec = 0; continue; }
            var idx = keyboard.IndexOf(c);
            if (idx >= 0 && consec > 0)
            {
                var prev = keyboard.IndexOf(normalized[normalized.IndexOf(c) - 1]);
                if (prev >= 0 && Math.Abs(prev - idx) == 1)
                {
                    consec++;
                    if (consec >= 5) return true;
                }
                else consec = 1;
            }
            else consec = 1;
        }

        return false;
    }

    public static int Levenshtein(string a, string b)
    {
        if (string.IsNullOrEmpty(a)) return b?.Length ?? 0;
        if (string.IsNullOrEmpty(b)) return a.Length;

        var n = a.Length;
        var m = b.Length;
        var d = new int[n + 1, m + 1];

        for (int i = 0; i <= n; i++) d[i, 0] = i;
        for (int j = 0; j <= m; j++) d[0, j] = j;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= m; j++)
            {
                var cost = a[i - 1] == b[j - 1] ? 0 : 1;
                d[i, j] = Math.Min(
                    Math.Min(d[i - 1, j] + 1, d[i, j - 1] + 1),
                    d[i - 1, j - 1] + cost);
            }
        }
        return d[n, m];
    }
}
