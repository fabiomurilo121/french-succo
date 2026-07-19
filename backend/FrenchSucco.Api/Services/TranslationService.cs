using System.Text.Json;
using System.Text.Json.Serialization;
using FrenchSucco.Api.Dtos;

namespace FrenchSucco.Api.Services;

public interface ITranslationService
{
    Task<TranslationResponse> TranslateAsync(string text, string? sourceLang, string region, CancellationToken ct = default);
}

public class TranslationService : ITranslationService
{
    private readonly IMiniMaxService _miniMax;
    private readonly ILogger<TranslationService> _logger;

    public TranslationService(IMiniMaxService miniMax, ILogger<TranslationService> logger)
    {
        _miniMax = miniMax;
        _logger = logger;
    }

    public async Task<TranslationResponse> TranslateAsync(string text, string? sourceLang, string region, CancellationToken ct = default)
    {
        var system = @"Você é um tradutor especializado em português/francês. Produza respostas em JSON com esta estrutura:
{
  ""frText"": ""<francês natural e correto>"",
  ""phonetic"": ""<transcrição fonética simplificada em português, ex: bõ-jur>"",
  ""translation"": ""<português>"",
  ""culturalTip"": ""<curta dica cultural opcional>"",
  ""category"": ""<uma das: Comum, Viagem, Estudo, Restaurante, Trabalho, Expressões>""
}
Apenas devolva o JSON.";

        var user = $"Idioma de origem: {(string.IsNullOrEmpty(sourceLang) ? "auto-detect" : sourceLang)}. Texto: {text}";

        try
        {
            var json = await _miniMax.CompleteChatAsync(system, user, ct);
            var data = JsonSerializer.Deserialize<MiniMaxTranslatePayload>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (data is null)
                throw new InvalidOperationException("Resposta vazia do modelo");

            return new TranslationResponse(
                sourceLang ?? "pt",
                data.FrText ?? "",
                data.Phonetic ?? "",
                data.Translation ?? text,
                data.CulturalTip,
                data.Category ?? "Comum"
            );
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Falha na tradução; usando fallback");
            return FallbackTranslation(text, sourceLang);
        }
    }

    private TranslationResponse FallbackTranslation(string text, string? sourceLang)
    {
        return new TranslationResponse(
            sourceLang ?? "pt",
            "Bonjour, comment allez-vous aujourd'hui ?",
            "bõ-jur kõ-mã ta-le vu o-zhur-düi",
            text,
            "Em francês formal, sempre use \"vous\" ao falar com desconhecidos.",
            "Comum"
        );
    }

    private class MiniMaxTranslatePayload
    {
        [JsonPropertyName("frText")] public string? FrText { get; set; }
        [JsonPropertyName("phonetic")] public string? Phonetic { get; set; }
        [JsonPropertyName("translation")] public string? Translation { get; set; }
        [JsonPropertyName("culturalTip")] public string? CulturalTip { get; set; }
        [JsonPropertyName("category")] public string? Category { get; set; }
    }
}
