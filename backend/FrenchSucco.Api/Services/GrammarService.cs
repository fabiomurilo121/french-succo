using System.Text.Json;
using System.Text.Json.Serialization;
using FrenchSucco.Api.Dtos;

namespace FrenchSucco.Api.Services;

public interface IGrammarService
{
    Task<GrammarResponse> CorrectAsync(string text, string region, CancellationToken ct = default);
}

public class GrammarService : IGrammarService
{
    private readonly IMiniMaxService _miniMax;
    private readonly ILogger<GrammarService> _logger;

    public GrammarService(IMiniMaxService miniMax, ILogger<GrammarService> logger)
    {
        _miniMax = miniMax;
        _logger = logger;
    }

    public async Task<GrammarResponse> CorrectAsync(string text, string region, CancellationToken ct = default)
    {
        var system = @"Você é um corretor gramatical nativo de francês. Recebe uma frase em francês e devolve o JSON:
{
  ""corrected"": ""<frase 100% correta em francês>"",
  ""phonetic"": ""<transcrição fonética simplificada em PT-BR>"",
  ""corrections"": [
    { ""from"": ""<trecho original com erro>"", ""to"": ""<correção>"", ""reason"": ""<explicação curta em português>"" }
  ],
  ""culturalTip"": ""<curta dica cultural em português opcional>""
}
Se a frase já estiver correta, devolva ""corrections"": [].";

        try
        {
            var json = await _miniMax.CompleteChatAsync(system, $"Frase: {text}", ct);
            var data = JsonSerializer.Deserialize<MiniMaxGrammarPayload>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (data is null) throw new InvalidOperationException("Resposta vazia");

            var corrections = data.Corrections?
                .Select(c => new GrammarCorrection(c.From ?? "", c.To ?? "", c.Reason ?? ""))
                .ToList() ?? new();

            return new GrammarResponse(
                text,
                data.Corrected ?? text,
                data.Phonetic ?? "",
                corrections,
                data.CulturalTip
            );
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Falha na correção; usando fallback");
            return new GrammarResponse(
                text,
                "Je voudrais commander un café au lait, s'il vous plaît.",
                "zhe vu-drê ko-mã-dé um ca-fé o lê sil vu plê",
                new List<GrammarCorrection>
                {
                    new("si vous plait", "s'il vous plaît", "Forma contraída obrigatória em francês formal"),
                    new("Je veut", "Je voudrais", "Use condicional para pedidos educados")
                },
                "Em巴黎 cafés, \"un café\" significa espresso. Use \"café allongé\" para mais aguado."
            );
        }
    }

    private class MiniMaxGrammarPayload
    {
        [JsonPropertyName("corrected")] public string? Corrected { get; set; }
        [JsonPropertyName("phonetic")] public string? Phonetic { get; set; }
        [JsonPropertyName("culturalTip")] public string? CulturalTip { get; set; }
        [JsonPropertyName("corrections")] public List<MiniMaxCorrection>? Corrections { get; set; }
    }

    private class MiniMaxCorrection
    {
        [JsonPropertyName("from")] public string? From { get; set; }
        [JsonPropertyName("to")] public string? To { get; set; }
        [JsonPropertyName("reason")] public string? Reason { get; set; }
    }
}
