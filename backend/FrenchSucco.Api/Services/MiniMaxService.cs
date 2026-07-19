using System.Text.Json;
using System.Text.Json.Serialization;

namespace FrenchSucco.Api.Services;

public interface IMiniMaxService
{
    Task<string> CompleteChatAsync(string systemPrompt, string userPrompt, CancellationToken ct = default);
    Task<byte[]> SynthesizeSpeechAsync(string text, string voice, double speed, string region, CancellationToken ct = default);
    Task<string> DetectLanguageAsync(string text, CancellationToken ct = default);
}

public class MiniMaxOptions
{
    public string BaseUrl { get; set; } = "https://api.minimax.io/v1";
    public string ApiKey { get; set; } = string.Empty;
    public string TextModel { get; set; } = "MiniMax-Text-01";
    public string Voice { get; set; } = "audio_default";
}

public class MiniMaxService : IMiniMaxService
{
    private readonly HttpClient _client;
    private readonly IConfiguration _config;
    private readonly ILogger<MiniMaxService> _logger;

    public MiniMaxService(HttpClient client, IConfiguration config, ILogger<MiniMaxService> logger)
    {
        _client = client;
        _config = config;
        _logger = logger;
        var opts = config.GetSection("MiniMax").Get<MiniMaxOptions>() ?? new MiniMaxOptions();
        var baseUrl = opts.BaseUrl.TrimEnd('/') + "/";
        _client.BaseAddress = new Uri(baseUrl);
        _client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", opts.ApiKey);
        _client.Timeout = TimeSpan.FromSeconds(60);
    }

    private MiniMaxOptions Options =>
        _config.GetSection("MiniMax").Get<MiniMaxOptions>() ?? new MiniMaxOptions();

    public async Task<string> CompleteChatAsync(string systemPrompt, string userPrompt, CancellationToken ct = default)
    {
        var body = new
        {
            model = Options.TextModel,
            messages = new[]
            {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
            temperature = 0.3
        };

        var content = new StringContent(JsonSerializer.Serialize(body), System.Text.Encoding.UTF8, "application/json");
        var res = await _client.PostAsync("chat/completions", content, ct);
        var payload = await res.Content.ReadAsStringAsync(ct);

        if (!res.IsSuccessStatusCode)
        {
            _logger.LogWarning("MiniMax chat failed: {Status} {Body}", res.StatusCode, payload);
            throw new HttpRequestException($"MiniMax API error {res.StatusCode}: {payload}");
        }

        using var doc = JsonDocument.Parse(payload);
        var message = doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString();
        return ExtractJson(message ?? string.Empty);
    }

    private static string ExtractJson(string raw)
    {
        if (string.IsNullOrWhiteSpace(raw)) return "{}";
        var trimmed = raw.Trim();

        if (trimmed.StartsWith("```"))
        {
            var firstNewline = trimmed.IndexOf('\n');
            if (firstNewline > 0)
            {
                trimmed = trimmed.Substring(firstNewline + 1);
            }
            var fenceEnd = trimmed.LastIndexOf("```", StringComparison.Ordinal);
            if (fenceEnd > 0)
            {
                trimmed = trimmed.Substring(0, fenceEnd).TrimEnd();
            }
        }

        var jsonStart = trimmed.IndexOfAny(new[] { '{', '[' });
        if (jsonStart > 0)
        {
            trimmed = trimmed.Substring(jsonStart);
        }
        var jsonEnd = trimmed.LastIndexOfAny(new[] { '}', ']' });
        if (jsonEnd >= 0 && jsonEnd < trimmed.Length - 1)
        {
            trimmed = trimmed.Substring(0, jsonEnd + 1);
        }
        return trimmed;
    }

    public async Task<byte[]> SynthesizeSpeechAsync(string text, string voice, double speed, string region, CancellationToken ct = default)
    {
        var voiceId = MapVoice(voice, region);
        var body = new
        {
            model = "speech-2.8-hd",
            text = text,
            stream = false,
            language_boost = "French",
            output_format = "hex",
            voice_setting = new
            {
                voice_id = voiceId,
                speed = Math.Clamp(speed, 0.5, 2.0),
                vol = 1,
                pitch = 0
            },
            audio_setting = new
            {
                sample_rate = 32000,
                bitrate = 128000,
                format = "mp3",
                channel = 1
            }
        };

        var content = new StringContent(JsonSerializer.Serialize(body), System.Text.Encoding.UTF8, "application/json");
        var res = await _client.PostAsync("t2a_v2", content, ct);
        var payload = await res.Content.ReadAsStringAsync(ct);

        if (!res.IsSuccessStatusCode)
        {
            _logger.LogWarning("MiniMax TTS failed: {Status} {Body}", res.StatusCode, payload);
            throw new HttpRequestException($"MiniMax TTS error {res.StatusCode}: {payload}");
        }

        using var doc = JsonDocument.Parse(payload);
        var root = doc.RootElement;

        if (root.TryGetProperty("base_resp", out var baseResp))
        {
            var statusCode = baseResp.GetProperty("status_code").GetInt32();
            if (statusCode != 0)
            {
                var msg = baseResp.TryGetProperty("status_msg", out var m) ? m.GetString() : "unknown";
                throw new HttpRequestException($"MiniMax TTS error {statusCode}: {msg}");
            }
        }

        var audioHex = root.GetProperty("data").GetProperty("audio").GetString();
        if (string.IsNullOrEmpty(audioHex))
            throw new InvalidOperationException("MiniMax TTS returned empty audio");

        return Convert.FromHexString(audioHex);
    }

    public async Task<string> DetectLanguageAsync(string text, CancellationToken ct = default)
    {
        var prompt = $"Detect the language of this text. Reply with only the ISO 639-1 code (pt, en, fr, es, etc.):\n\nText: {text}";
        return await CompleteChatAsync(
            "You are a language detection expert. Respond only with a 2-letter language code.",
            prompt,
            ct);
    }

    private string MapVoice(string voice, string region)
    {
        var isMale = string.Equals(voice, "male", StringComparison.OrdinalIgnoreCase);
        return (region?.ToLowerInvariant(), isMale) switch
        {
            ("qc", true) or ("quebec", true) or ("ca", true) => "French_CasualMan",
            ("qc", false) or ("quebec", false) or ("ca", false) => "French_Female_News Anchor",
            ("be", _) or ("belgium", _) => isMale ? "French_Male_Speech_New" : "French_FemaleAnchor",
            _ => isMale ? "French_MaleNarrator" : "French_MovieLeadFemale"
        };
    }
}
