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

    public TranslationService(IMiniMaxService miniMax)
    {
        _miniMax = miniMax;
    }

    public async Task<TranslationResponse> TranslateAsync(string text, string? sourceLang, string region, CancellationToken ct = default)
    {
        var system = @"Você é um tradutor especializado em português↔francês. Responda SOMENTE em JSON válido no seguinte formato:
{
  ""frInformal"": ""<francês informal/tu, tom amigável e natural entre conhecidos>"",
  ""frFormal"": ""<francês formal/você (vous), tom polido e profissional>"",
  ""phoneticInformal"": ""<transcrição fonética simplificada em pt-BR para frInformal>"",
  ""phoneticFormal"": ""<transcrição fonética simplificada em pt-BR para frFormal>"",
  ""phonetic"": ""<Use o mesmo valor de phoneticInformal — mantido para compatibilidade>"",
  ""translation"": ""<português>"",
  ""culturalTip"": ""<curta dica cultural opcional>"",
  ""category"": ""<uma das: Comum, Viagem, Estudo, Restaurante, Trabalho, Expressões>""
}
Regras: frInformal e frFormal DEVEM ser frases equivalentes em significado, diferindo APENAS no registro (tu/vous, coloquial vs. polido). As fonéticas phoneticInformal e phoneticFormal devem refletir a pronúncia de cada variante. Não use markdown.";

        var user = $"Idioma de origem: {(string.IsNullOrEmpty(sourceLang) ? "auto-detect" : sourceLang)}. Texto: {text}";

        var json = await _miniMax.CompleteChatAsync(system, user, ct, jsonMode: true);

        if (string.IsNullOrWhiteSpace(json))
            throw new InvalidOperationException("Resposta vazia do modelo de tradução.");

        var data = JsonSerializer.Deserialize<MiniMaxTranslatePayload>(json,
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

        if (data is null)
            throw new InvalidOperationException("Não foi possível interpretar a resposta do tradutor.");

        var informal = !string.IsNullOrWhiteSpace(data.FrInformal)
            ? data.FrInformal!
            : (!string.IsNullOrWhiteSpace(data.FrText) ? data.FrText! : "");
        var formal = data.FrFormal;

        if (string.IsNullOrWhiteSpace(informal))
            throw new InvalidOperationException("O tradutor não retornou uma frase em francês.");

        if (string.IsNullOrWhiteSpace(formal))
            formal = informal;

        var phoneticInformal = !string.IsNullOrWhiteSpace(data.PhoneticInformal)
            ? data.PhoneticInformal
            : (data.Phonetic ?? "");
        var phoneticFormal = !string.IsNullOrWhiteSpace(data.PhoneticFormal)
            ? data.PhoneticFormal
            : phoneticInformal;

        return new TranslationResponse(
            sourceLang ?? "pt",
            informal,
            informal,
            formal,
            phoneticInformal,
            phoneticFormal,
            data.Phonetic ?? phoneticInformal,
            data.Translation ?? text,
            data.CulturalTip,
            data.Category ?? "Comum"
        );
    }

    private class MiniMaxTranslatePayload
    {
        [JsonPropertyName("frInformal")] public string? FrInformal { get; set; }
        [JsonPropertyName("frFormal")] public string? FrFormal { get; set; }
        [JsonPropertyName("frText")] public string? FrText { get; set; }
        [JsonPropertyName("phoneticInformal")] public string? PhoneticInformal { get; set; }
        [JsonPropertyName("phoneticFormal")] public string? PhoneticFormal { get; set; }
        [JsonPropertyName("phonetic")] public string? Phonetic { get; set; }
        [JsonPropertyName("translation")] public string? Translation { get; set; }
        [JsonPropertyName("culturalTip")] public string? CulturalTip { get; set; }
        [JsonPropertyName("category")] public string? Category { get; set; }
    }
}
