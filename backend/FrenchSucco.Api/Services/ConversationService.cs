using System.Text.Json;
using System.Text.Json.Serialization;
using FrenchSucco.Api.Dtos;

namespace FrenchSucco.Api.Services;

public interface IConversationService
{
    Task<ConversationStartResponse> StartAsync(string scenario, string region, CancellationToken ct = default);
    Task<ConversationReplyResponse> ReplyAsync(
        string scenario,
        List<ConversationTurnDto> history,
        string userText,
        string region,
        CancellationToken ct = default);
}

public class ConversationService : IConversationService
{
    private readonly IMiniMaxService _miniMax;

    private static readonly Dictionary<string, (string Character, string Setting, string Language, string Mode)> Scenarios =
        new(StringComparer.OrdinalIgnoreCase)
        {
            ["restaurant"] = (
                "Le serveur / La serveuse",
                "Vous êtes dans un bistrot parisien. Vous venez d'entrer et vous attendez que le serveur vous accueille et vous amène au menu.",
                "Français de France (Paris)",
                "vouvoiement"
            ),
            ["marche"] = (
                "Le marchand / La marchande",
                "Vous êtes sur un marchéprovençal. Vous déambulez entre les étals de fruits, légumes et fromages. Vous vous arrêtez devant un stand.",
                "Français de France (sud)",
                "vouvoiement"
            ),
            ["cafe"] = (
                "Le barista / La barista",
                "Vous êtes dans un café de quartier à 8h du matin. Il y a peu de monde. Vous entrez pour commander un petit-déjeuner.",
                "Français de France",
                "vouvoiement"
            ),
            ["hotel"] = (
                "Le réceptionniste / La réceptionniste",
                "Vous arrivez à la réception d'un hôtel 3 étoiles à Lyon. Vous n'avez pas encore réservé et vous voulez une chambre pour deux nuits.",
                "Français de France",
                "vouvoiement"
            ),
            ["aeroport"] = (
                "L'agent d'enregistrement",
                "Vous êtes à l'aéroport Charles de Gaulle, au guichet d'une compagnie aérienne. Vous devez enregistrer vos bagages et obtenir votre carte d'embarquement.",
                "Français de France",
                "vouvoiement"
            ),
            ["pharmacie"] = (
                "Le pharmacien / La pharmacienne",
                "Vous entrez dans une pharmacie à Marseille. Vous avez mal à la tête et vous cherchez quelque chose pour vous soulager.",
                "Français de France (sud)",
                "tutoiement (pharmacien parfois plus familier)"
            ),
            ["boutique"] = (
                "Le vendeur / La vendeuse",
                "Vous êtes dans une boutique de vêtements à Bordeaux. Vous cherchez un t-shirt de taille M de couleur bleue.",
                "Français de France",
                "vouvoiement"
            ),
            ["taxi"] = (
                "Le chauffeur de taxi",
                "Vous hèle un taxi place de la Concorde. Vous voulez vous rendre à la Tour Eiffel et vous êtes pressé.",
                "Français de France",
                "tutoiement (souvent, à Paris)"
            ),
        };

    public ConversationService(IMiniMaxService miniMax)
    {
        _miniMax = miniMax;
    }

    private static string ResolveScenario(string scenario, out string character, out string setting, out string language, out string mode)
    {
        if (Scenarios.TryGetValue(scenario, out var s))
        {
            character = s.Character;
            setting = s.Setting;
            language = s.Language;
            mode = s.Mode;
            return s.Character;
        }
        character = Scenarios["restaurant"].Character;
        setting = Scenarios["restaurant"].Setting;
        language = Scenarios["restaurant"].Language;
        mode = Scenarios["restaurant"].Mode;
        return "restaurant";
    }

    public async Task<ConversationStartResponse> StartAsync(string scenario, string region, CancellationToken ct = default)
    {
        var resolved = ResolveScenario(scenario, out var character, out var setting, out var language, out var mode);

        var system = $@"Vous jouez le rôle d'un acteur pedagogique pour aider un apprenant brésilien de français.
Scénario: {scenario}
Votre personnage: {character}
Cadre: {setting}
Variante: {language}
Tutoiement/Vouvoiement: {mode}
Région: {region}

Règles:
1. Vous êtes {character}. Restez strictement dans le personnage.
2. Parlez TOUJOURS en français. Phrases courtes (max 18 mots), naturelles, adaptées au niveau A2.
3. Saluez d'abord de manière authentique au scénario (Bonjour, Bienvenue, etc.).
4. Faites UNE seule question à la fois pour faire avancer la conversation.
5. N'invitez pas l'apprenant à parler français explicitement — posez la question naturellement, il doit répondre en français.
6. Si l'apprenant écrit une phrase avec une petite erreur, NE CORRIGEZ PAS directement dans votre réplique. Continuez la conversation comme un vrai {character}.
7. Le ton doit être amical, patient, encourageant — comme un acteur patient qui aime aider le visiteur.

IMPORTANT — suggestions:
Le champ ""suggestedReplies"" doit contenir des répliques que le CLIENT (l'apprenant brésilien, le visiteur, le touriste) dirait pour répondre à votre salutation. Vous jouez le rôle du {character}, donc le client est votre interlocuteur. Ne mettez JAMAIS de répliques que vous-même ({character}) diriez. Mettez-vous à la place du client qui commande au restaurant, achète au marché, demande à l'hôtel, etc. Chaque suggestion doit être en français ET traduite en portugais brésilien (""pt"").

Répondez ONLY avec ce JSON strict:
{{
  ""greeting"": ""<votre première réplique en français, en restant dans le personnage, max 18 mots>"",
  ""phonetic"": ""<transcription phonétique simplifiée en PT-BR de la réplique, ex: 'bõ.ʒuʁ kɔ.mã t‿a.le vu'>"",
  ""translation"": ""<traduction en portugais brésilien de la réplique>"",
  ""culturalTip"": ""<courte astuce culturelle en portugais liée au scénario, ex: 'Ao entrar em qualquer comércio na França, diga Bonjour antes de pedir algo.'>"",
  ""suggestedReplies"": [
    {{ ""fr"": ""<réplique COURTE que le CLIENT dirait, en français>"", ""pt"": ""<traduction en portugais brésilien>"", ""relevance"": ""réponse utile"" }},
    {{ ""fr"": ""<autre réplique du client>"", ""pt"": ""<traduction en portugais brésilien>"", ""relevance"": ""réponse simple"" }},
    {{ ""fr"": ""<autre réplique du client>"", ""pt"": ""<traduction en portugais brésilien>"", ""relevance"": ""question pour avancer"" }}
  ]
}}";

        var json = await _miniMax.CompleteChatAsync(system,
            "Démarrez la conversation. Saluez le client et posez votre première question.", ct);

        var data = ParseStart(json);
        return new ConversationStartResponse(
            resolved,
            character,
            setting,
            data.Greeting ?? "Bonjour !",
            data.Phonetic ?? "",
            data.Translation ?? "",
            data.CulturalTip,
            (data.SuggestedReplies ?? new()).Take(3)
                .Select(s => new ConversationSuggestionDto(s.Fr ?? "", s.Pt ?? ""))
                .ToList()
        );
    }

    public async Task<ConversationReplyResponse> ReplyAsync(
        string scenario,
        List<ConversationTurnDto> history,
        string userText,
        string region,
        CancellationToken ct = default)
    {
        var resolved = ResolveScenario(scenario, out var character, out var setting, out var language, out var mode);

        var historyText = BuildHistoryText(history);

        var system = $@"Vous jouez le rôle d'un acteur pedagogique pour aider un apprenant brésilien de français.
Scénario: {scenario}
Votre personnage: {character}
Cadre: {setting}
Variante: {language}
Tutoiement/Vouvoiement: {mode}
Région: {region}

Règles STRICTES:
1. Vous êtes {character}. Restez strictement dans le personnage.
2. Parlez TOUJOURS en français. Phrases courtes (max 18 mots), naturelles, adaptées au niveau A2.
3. Utilisez un ton amical, patient, encourageant.
4. NE CORRIGEZ PAS verbalement les erreurs de l'apprenant — continuez la conversation naturellement comme un vrai {character}.
5. Si l'apprenant dit quelque chose de totalement incompréhensible, demandez-lui de répéter poliment.
6. Faites UNE seule question à la fois pour faire avancer la conversation.
7. Ne déviez jamais du scénario. Si l'apprenant pose une question hors sujet, ramenez-le poliment au scénario.

IMPORTANT — suggestions:
Le champ ""suggestedReplies"" doit contenir des répliques que le CLIENT (l'apprenant brésilien, votre interlocuteur) pourrait dire ensuite pour répondre à votre dernière réplique. Vous jouez {character} ; les suggestions doivent refléter ce que le client dirait, JAMAIS ce que vous ({character}) répondriez. Mettez-vous à la place du client : commande au restaurant, achat au marché, demande à l'hôtel, etc. Chaque suggestion DOIT être accompagnée de sa traduction en portugais brésilien (""pt"").

Historique de la conversation:
{historyText}

Répondez ONLY avec ce JSON strict:
{{
  ""reply"": ""<votre réplique en français en restant dans le personnage, max 18 mots>"",
  ""replyPhonetic"": ""<transcription phonétique simplifiée en PT-BR de votre réplique>"",
  ""replyTranslation"": ""<traduction en portugais brésilien de votre réplique>"",
  ""culturalTip"": ""<courte astuce culturelle en portugais si pertinent, sinon string vide>"",
  ""suggestedReplies"": [
    {{ ""fr"": ""<réplique COURTE que le CLIENT dirait ensuite, en français>"", ""pt"": ""<traduction en portugais brésilien>"", ""relevance"": ""réponse utile"" }},
    {{ ""fr"": ""<autre réplique du client>"", ""pt"": ""<traduction en portugais brésilien>"", ""relevance"": ""réponse simple"" }},
    {{ ""fr"": ""<autre réplique du client>"", ""pt"": ""<traduction en portugais brésilien>"", ""relevance"": ""question pour avancer"" }}
  ]
}}";

        var userPrompt = $"Le client vient de dire: \"{userText}\". Répondez dans le personnage.";

        var json = await _miniMax.CompleteChatAsync(system, userPrompt, ct);

        var data = ParseReply(json);

        var correction = await CorrectUserTurnAsync(userText, region, ct);

        return new ConversationReplyResponse(
            data.Reply ?? "Bien sûr, dites-moi.",
            data.ReplyPhonetic ?? "",
            data.ReplyTranslation ?? "",
            correction,
            string.IsNullOrWhiteSpace(data.CulturalTip) ? null : data.CulturalTip,
            (data.SuggestedReplies ?? new()).Take(3)
                .Select(s => new ConversationSuggestionDto(s.Fr ?? "", s.Pt ?? ""))
                .ToList()
        );
    }

    private async Task<List<ConversationCorrectedTurnDto>> CorrectUserTurnAsync(string userText, string region, CancellationToken ct)
    {
        var system = @"Vous êtes un correcteur de français pour apprenants brésiliens. L'apprenant vient de dire quelque chose en français dans un dialogue de role-play. Vous devez corriger UNIQUEMENT les erreurs importantes (grammaire, accord, conjugaison, orthographe). Si la phrase est déjà correcte, renvoyez corrections: [].

Répondez ONLY avec ce JSON strict:
{
  ""corrected"": ""<la phrase corrigée en français, identique à l'originale si déjà correcte>"",
  ""phonetic"": ""<transcription phonétique simplifiée en PT-BR>"",
  ""corrections"": [
    { ""from"": ""<trecho original com erro>"", ""to"": ""<correção>"", ""reason"": ""<explicação curta em português>"" }
  ]
}";

        try
        {
            var json = await _miniMax.CompleteChatAsync(system, $"L'apprenant dit: \"{userText}\"", ct);
            var data = JsonSerializer.Deserialize<MiniMaxConversationCorrection>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (data is null) return new();

            var corrections = (data.Corrections ?? new())
                .Where(c => !string.IsNullOrWhiteSpace(c.From) && !string.IsNullOrWhiteSpace(c.To))
                .Select(c => new GrammarCorrection(c.From!, c.To!, c.Reason ?? ""))
                .ToList();

            if (corrections.Count == 0) return new();

            return new()
            {
                new ConversationCorrectedTurnDto(
                    userText,
                    data.Corrected ?? userText,
                    data.Phonetic ?? "",
                    corrections
                )
            };
        }
        catch
        {
            return new();
        }
    }

    private static string BuildHistoryText(List<ConversationTurnDto> history)
    {
        if (history.Count == 0) return "(début de la conversation)";
        var lines = new List<string>();
        foreach (var turn in history)
        {
            var role = string.Equals(turn.Role, "user", StringComparison.OrdinalIgnoreCase)
                ? "Le client"
                : "Vous (personnage)";
            lines.Add($"{role}: {turn.Text}");
        }
        return string.Join("\n", lines);
    }

    private static StartPayload ParseStart(string json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return new StartPayload { Greeting = "Bonjour !", Phonetic = "bõ.ʒuʁ", Translation = "Olá!" };
        try
        {
            return JsonSerializer.Deserialize<StartPayload>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new StartPayload();
        }
        catch
        {
            return new StartPayload { Greeting = "Bonjour !", Phonetic = "bõ.ʒuʁ", Translation = "Olá!" };
        }
    }

    private static ReplyPayload ParseReply(string json)
    {
        if (string.IsNullOrWhiteSpace(json))
            return new ReplyPayload { Reply = "Bien sûr, dites-moi.", ReplyPhonetic = "bjɛ̃ suʁ", ReplyTranslation = "Claro, diga-me." };
        try
        {
            return JsonSerializer.Deserialize<ReplyPayload>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true }) ?? new ReplyPayload();
        }
        catch
        {
            return new ReplyPayload { Reply = "Bien sûr, dites-moi.", ReplyPhonetic = "bjɛ̃ suʁ", ReplyTranslation = "Claro, diga-me." };
        }
    }

    private class MiniMaxSuggestion
    {
        [JsonPropertyName("fr")] public string? Fr { get; set; }
        [JsonPropertyName("pt")] public string? Pt { get; set; }
        [JsonPropertyName("relevance")] public string? Relevance { get; set; }
    }

    private class StartPayload
    {
        [JsonPropertyName("greeting")] public string? Greeting { get; set; }
        [JsonPropertyName("phonetic")] public string? Phonetic { get; set; }
        [JsonPropertyName("translation")] public string? Translation { get; set; }
        [JsonPropertyName("culturalTip")] public string? CulturalTip { get; set; }
        [JsonPropertyName("suggestedReplies")] public List<MiniMaxSuggestion>? SuggestedReplies { get; set; }
    }

    private class ReplyPayload
    {
        [JsonPropertyName("reply")] public string? Reply { get; set; }
        [JsonPropertyName("replyPhonetic")] public string? ReplyPhonetic { get; set; }
        [JsonPropertyName("replyTranslation")] public string? ReplyTranslation { get; set; }
        [JsonPropertyName("culturalTip")] public string? CulturalTip { get; set; }
        [JsonPropertyName("suggestedReplies")] public List<MiniMaxSuggestion>? SuggestedReplies { get; set; }
    }

    private class MiniMaxConversationCorrection
    {
        [JsonPropertyName("corrected")] public string? Corrected { get; set; }
        [JsonPropertyName("phonetic")] public string? Phonetic { get; set; }
        [JsonPropertyName("corrections")] public List<MiniMaxCorrectionItem>? Corrections { get; set; }
    }

    private class MiniMaxCorrectionItem
    {
        [JsonPropertyName("from")] public string? From { get; set; }
        [JsonPropertyName("to")] public string? To { get; set; }
        [JsonPropertyName("reason")] public string? Reason { get; set; }
    }
}
