using System.Text.Json;
using System.Text.Json.Serialization;
using FrenchSucco.Api.Dtos;

namespace FrenchSucco.Api.Services;

public interface IWritingService
{
    Task<WritingGradeResponse> GradeAsync(WritingGradeRequest request, CancellationToken ct = default);
    Task<WritingWordsResponse> GenerateWordsAsync(WritingWordsRequest request, CancellationToken ct = default);
}

public class WritingService : IWritingService
{
    private readonly IMiniMaxService _miniMax;
    private readonly ILogger<WritingService> _logger;

    private static readonly Dictionary<string, string> LevelPrompts =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["A1"] = "débutant complet — phrases très simples, vocabulaire de base",
            ["A2"] = "élémentaire — situations quotidiennes, phrases courtes mais complètes",
            ["B1"] = "intermédiaire — peut exprimer des opinions et raconter des événements",
            ["B2"] = "intermédiaire-avancé — textes plus riches, nuances et connecteurs variés"
        };

    private static readonly Dictionary<string, string> LevelTopics =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["A1"] = "la vie quotidienne : maison, école, famille, animaux, aliments de base",
            ["A2"] = "le voyage et les loisirs : transports, hôtel, restaurant, météo, achats",
            ["B1"] = "le travail et la vie professionnelle : entreprise, collègues, projets, réunions",
            ["B2"] = "la société, la culture et le débat : médias, politique, environnement, valeurs"
        };

    public WritingService(IMiniMaxService miniMax, ILogger<WritingService> logger)
    {
        _miniMax = miniMax;
        _logger = logger;
    }

    public async Task<WritingWordsResponse> GenerateWordsAsync(WritingWordsRequest request, CancellationToken ct = default)
    {
        var level = (request.Level ?? "A1").Trim().ToUpperInvariant();
        if (!LevelPrompts.ContainsKey(level)) level = "A1";
        var defaultTopic = LevelTopics[level];
        var topic = string.IsNullOrWhiteSpace(request.Topic) ? defaultTopic : request.Topic!.Trim();
        var count = request.Count is > 0 and <= 30 ? request.Count.Value : 18;

        var system = $@"Vous êtes un professeur de français pour apprenants brésiliens.
Niveau CEFR cible : {level} ({LevelPrompts[level]}).
Thème imposé : {topic}.

Tâche : proposer exactement {count} mots-clés en français, appropriés pour ce niveau et ce thème.
Pour chaque mot, fournissez :
- ""fr""  : le mot ou court syntagme en français (1-3 mots max). Préférez des mots COURANTS utiles pour rédiger.
- ""pt""  : traduction COURTE en portugais brésilien (1-3 mots).
- ""phonetic"" : prononciation SIMPLIFIÉE en pt-BR (comment un Brésilien lirait le mot à voix haute). 
  Exemples : ""bõ-jur"" para bonjour ; ""mer-si"" para merci ; ""a-mwa"" para amour ; ""pa-ri"" para Paris.

Variez les mots (pas de doublons). Tous doivent être reliés au thème.
Évitez : pronoms je/tu, mots vides (chose, truc), conjugaisons (mangé/mangeons).

Répondez UNIQUEMENT avec ce JSON strict :
{{
  ""topic"": ""<thème court en français, ex: 'la vie quotidienne'>"",
  ""words"": [
    {{ ""fr"": ""..."", ""pt"": ""..."", ""phonetic"": ""..."" }},
    ...
  ]
}}";

        var json = "";
        try
        {
            json = await _miniMax.CompleteChatAsync(
                system,
                $"Gère exactement {count} mots pour le niveau {level} sur le thème « {topic} ».",
                ct,
                jsonMode: true,
                maxTokens: 1200);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "GenerateWords failed");
        }

        var parsed = ParseWordsResponse(json);
        var words = (parsed.Words ?? new())
            .Where(w => !string.IsNullOrWhiteSpace(w.Fr))
            .DistinctBy(w => w.Fr!.Trim().ToLowerInvariant())
            .Take(count)
            .Select(w => new WritingWord(
                w.Fr!.Trim(),
                (w.Pt ?? "").Trim(),
                (w.Phonetic ?? "").Trim()))
            .ToList();

        if (words.Count < 6)
        {
            // fallback estático mínimo
            words = FallbackWords(level);
        }

        var topicShort = string.IsNullOrWhiteSpace(parsed.Topic) ? defaultTopic : parsed.Topic!;
        return new WritingWordsResponse(level, topicShort, words);
    }

    private static List<WritingWord> FallbackWords(string level)
    {
        return level switch
        {
            "A1" => new() {
                new("bonjour", "olá", "bõ-jur"),
                new("merci", "obrigado", "mer-si"),
                new("maison", "casa", "me-zõ"),
                new("famille", "família", "fa-mia"),
                new("école", "escola", "e-kol"),
                new("chat", "gato", "cha"),
                new("chien", "cão", "chi-ẽ"),
                new("pain", "pão", "pẽ"),
                new("lait", "leite", "le"),
                new("eau", "água", "o"),
                new("rouge", "vermelho", "rujo"),
                new("bleu", "azul", "blö"),
                new("voiture", "carro", "vua-tür"),
                new("livre", "livro", "li-vr"),
                new("main", "mão", "mẽ"),
                new("manger", "comer", "mã-jê"),
                new("dormir", "dormir", "dor-mir"),
                new("ami", "amigo", "a-mi"),
                new("content", "feliz", "cõ-tã")
            },
            "A2" => new() {
                new("voisin", "vizinho", "vua-zẽ"),
                new("boulangerie", "padaria", "bu-lã-jri"),
                new("voyage", "viagem", "vua-iajo"),
                new("train", "trem", "trẽ"),
                new("plage", "praia", "plajo"),
                new("soleil", "sol", "so-léi"),
                new("pluie", "chuva", "plü-i"),
                new("acheter", "comprar", "a-che-tê"),
                new("chercher", "procurar", "xer-chê"),
                new("demain", "amanhã", "de-mẽ"),
                new("travail", "trabalho", "tra-vai"),
                new("jardin", "jardim", "jar-dẽ"),
                new("musique", "música", "mü-zik"),
                new("film", "filme", "film"),
                new("marché", "mercado", "mar-chê"),
                new("matin", "manhã", "ma-tẽ"),
                new("soir", "noite", "suar"),
                new("repas", "refeição", "re-pa"),
                new("manteau", "casaco", "mã-to")
            },
            "B1" => new() {
                new("envoyer", "enviar", "ã-vua-yê"),
                new("discuter", "discutir", "dis-kü-tê"),
                new("entreprise", "empresa", "ã-tre-priz"),
                new("collègue", "colega", "co-leg"),
                new("projet", "projeto", "pro-jê"),
                new("réunion", "reunião", "rê-ü-niõ"),
                new("objectif", "objetivo", "ob-jec-tif"),
                new("remarquer", "notar", "re-mar-kê"),
                new("mémoire", "memória", "mê-muar"),
                new("souvenir", "lembrança", "su-venir"),
                new("voyage", "viagem", "vua-iajo"),
                new("étranger", "estrangeiro", "e-trã-jê"),
                new("patience", "paciência", "pa-sĩs"),
                new("fatigue", "cansaço", "fa-tig"),
                new("plaisir", "prazer", "plê-zir"),
                new("conseil", "conselho", "cõ-séi"),
                new("réfléchir", "refletir", "rê-flé-chir"),
                new("proposer", "propor", "pro-pô-zê"),
                new("hésiter", "hesitar", "e-zi-tê")
            },
            _ => new() {
                new("considérer", "considerar", "cõ-si-de-rê"),
                new("remarquable", "notável", "re-mar-kabl"),
                new("conséquence", "consequência", "cõ-sé-kãs"),
                new("néanmoins", "no entanto", "né-ã-mwẽ"),
                new("parvenir", "conseguir", "par-venir"),
                new("souligner", "enfatizar", "su-li-ñê"),
                new("soutenir", "apoiar", "su-tenir"),
                new("perspective", "perspectiva", "pers-pek-tiv"),
                new("enjeux", "desafios", "ã-jö"),
                new("ambiguïté", "ambiguidade", "ã-bi-güi-te"),
                new("évoquer", "evocar", "e-vo-kê"),
                new("contempler", "contemplar", "cõ-tã-plê"),
                new("paradoxe", "paradoxo", "pa-ra-docs"),
                new("nuance", "nuance", "nü-ãs"),
                new("engagement", "compromisso", "ã-gaj-mã"),
                new("convergence", "convergência", "cõ-ver-jãs"),
                new("résilience", "resiliência", "rê-zi-li-ãs"),
                new("soupçonner", "suspeitar", "sup-so-nê"),
                new("rétroaction", "retroação", "rê-tro-ac-siõ"),
                new("épanouissement", "florescimento", "e-pa-nui-smã")
            }
        };
    }

    public async Task<WritingGradeResponse> GradeAsync(WritingGradeRequest request, CancellationToken ct = default)
    {
        var words = (request.Words ?? Array.Empty<string>())
            .Select(w => w.Trim().ToLowerInvariant())
            .Where(w => !string.IsNullOrEmpty(w))
            .Distinct()
            .ToArray();
        var text = (request.Text ?? string.Empty).Trim();
        var level = (request.Level ?? "A1").Trim().ToUpperInvariant();
        if (!LevelPrompts.ContainsKey(level)) level = "A1";

        if (text.Length < 12)
        {
            return new WritingGradeResponse(
                Score: 0,
                WordsUsed: 0,
                WordsTotal: words.Length,
                WordsMissed: words.ToList(),
                WordsUsedList: new(),
                GrammarErrors: new(),
                Feedback: "Texto muito curto — escreva pelo menos algumas frases.",
                Suggestion: "Tente usar pelo menos metade das palavras impostas."
            );
        }

        var (usedList, missedList) = ComputeWordUsage(words, text);

        var systemPrompt = $@"Vous êtes un professeur de français examinant une rédaction d'un apprenant brésilien.

Niveau ciblé : {level} ({LevelPrompts[level]}).

Mots imposés à utiliser naturellement dans le texte :
{string.Join(", ", words.Select(w => "· " + w))}

Texte soumis par l'apprenant :
<<<
{text}
>>>

Votre tâche :
1. Attribuez une note globale /100 selon ces critères pondérés :
   - Utilisation naturelle des mots imposés (0-30 points)
   - Grammaire et orthographe (0-30 points)
   - Cohérence, fluidité, richesse du vocabulaire (0-25 points)
   - Adaptation au niveau {level} (0-15 points)
2. Identifiez TOUTES les erreurs grammaticales/orthographiques importantes (pas les détails stylistiques insignifiants). Pour chaque erreur, fournissez :
   - ""from"" : le passage original
   - ""to"" : la correction
   - ""reason"" : explication COURTE en portugais brésilien (max 12 mots)
3. Rédigez un feedback global COURT (1-3 phrases) en portugais brésilien, encourageant, qui mentionne les points forts ET les points à améliorer.
4. Rédigez une suggestion PRATIQUE (1-2 phrases) en portugais brésilien sur ce que l'apprenant devrait étudier pour progresser.

Répondez UNIQUEMENT avec ce JSON strict :
{{
  ""score"": <entier 0-100>,
  ""grammarErrors"": [
    {{ ""from"": ""..."", ""to"": ""..."", ""reason"": ""..."" }}
  ],
  ""feedback"": ""...""  (en portugais brésilien),
  ""suggestion"": ""..."" (en portugais brésilien)
}}";

        string json;
        try
        {
            json = await _miniMax.CompleteChatAsync(
                systemPrompt,
                "Évaluez ce texte et renvoyez UNIQUEMENT le JSON demandé.",
                ct,
                jsonMode: true,
                maxTokens: 900);
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Writing grading failed");
            json = "";
        }

        var parsed = ParseGradeResponse(json);

        var score = Math.Clamp(parsed.Score, 0, 100);
        var errors = (parsed.GrammarErrors ?? new())
            .Where(e => !string.IsNullOrWhiteSpace(e.From) && !string.IsNullOrWhiteSpace(e.To))
            .Take(15)
            .Select(e => new WritingGrammarError(e.From!, e.To!, e.Reason ?? ""))
            .ToList();

        return new WritingGradeResponse(
            Score: score,
            WordsUsed: usedList.Count,
            WordsTotal: words.Length,
            WordsMissed: missedList,
            WordsUsedList: usedList,
            GrammarErrors: errors,
            Feedback: string.IsNullOrWhiteSpace(parsed.Feedback)
                ? "Continue praticando — você está no caminho certo."
                : parsed.Feedback!,
            Suggestion: string.IsNullOrWhiteSpace(parsed.Suggestion)
                ? "Releia o texto em voz alta e revise as concordâncias."
                : parsed.Suggestion!
        );
    }

    private static (List<string> used, List<string> missed) ComputeWordUsage(string[] words, string text)
    {
        var lowerText = " " + text.ToLowerInvariant() + " ";
        var used = new List<string>();
        var missed = new List<string>();
        foreach (var w in words)
        {
            var token = " " + w + " ";
            var token2 = " " + w + "s ";
            var token3 = " " + w + ".";
            var token4 = " " + w + ",";
            var token5 = " " + w + ";";
            if (lowerText.Contains(token) || lowerText.Contains(token2) || lowerText.Contains(token3) ||
                lowerText.Contains(token4) || lowerText.Contains(token5) ||
                lowerText.Contains(" " + w + "'") || lowerText.Contains(" " + w + "\u00A0"))
            {
                used.Add(w);
            }
            else
            {
                missed.Add(w);
            }
        }
        return (used, missed);
    }

    private GradePayload ParseGradeResponse(string json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return new GradePayload { Score = 50 };
        try
        {
            return JsonSerializer.Deserialize<GradePayload>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new GradePayload { Score = 50 };
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Parse grade response");
            return new GradePayload { Score = 50 };
        }
    }

    private class GradePayload
    {
        [JsonPropertyName("score")] public int Score { get; set; }
        [JsonPropertyName("feedback")] public string? Feedback { get; set; }
        [JsonPropertyName("suggestion")] public string? Suggestion { get; set; }
        [JsonPropertyName("grammarErrors")] public List<GradeError>? GrammarErrors { get; set; }
    }

    private class GradeError
    {
        [JsonPropertyName("from")] public string? From { get; set; }
        [JsonPropertyName("to")] public string? To { get; set; }
        [JsonPropertyName("reason")] public string? Reason { get; set; }
    }

    private class WordsPayload
    {
        [JsonPropertyName("topic")] public string? Topic { get; set; }
        [JsonPropertyName("words")] public List<WordEntry>? Words { get; set; }
    }

    private class WordEntry
    {
        [JsonPropertyName("fr")] public string? Fr { get; set; }
        [JsonPropertyName("pt")] public string? Pt { get; set; }
        [JsonPropertyName("phonetic")] public string? Phonetic { get; set; }
    }

    private WordsPayload ParseWordsResponse(string json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return new WordsPayload();
        try
        {
            return JsonSerializer.Deserialize<WordsPayload>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new WordsPayload();
        }
        catch (Exception ex)
        {
            _logger.LogWarning(ex, "Parse words response");
            return new WordsPayload();
        }
    }
}