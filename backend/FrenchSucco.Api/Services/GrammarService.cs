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

    public GrammarService(IMiniMaxService miniMax)
    {
        _miniMax = miniMax;
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

        var json = await _miniMax.CompleteChatAsync(system, $"Frase: {text}", ct);

        if (string.IsNullOrWhiteSpace(json))
            throw new InvalidOperationException("Resposta vazia do corretor gramatical.");

        var data = JsonSerializer.Deserialize<MiniMaxGrammarPayload>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        if (data is null)
            throw new InvalidOperationException("Não foi possível interpretar a resposta do corretor.");

        if (string.IsNullOrWhiteSpace(data.Corrected))
            throw new InvalidOperationException("O corretor não retornou uma versão corrigida.");

        var corrections = data.Corrections?
            .Select(c => new GrammarCorrection(c.From ?? "", c.To ?? "", c.Reason ?? ""))
            .ToList() ?? new();

        return new GrammarResponse(
            text,
            data.Corrected,
            data.Phonetic ?? "",
            corrections,
            data.CulturalTip
        );
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
