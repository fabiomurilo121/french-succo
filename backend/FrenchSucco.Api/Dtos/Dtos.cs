namespace FrenchSucco.Api.Dtos;

public record TranslateRequest(
    string Text,
    string? SourceLang,
    string? TargetLang = "fr",
    string? Region = "fr"
);

public record GrammarRequest(
    string Text,
    string? Region = "fr"
);

public record GrammarCorrection(
    string From,
    string To,
    string Reason
);

public record TranslationResponse(
    string SourceLang,
    string FrText,
    string FrInformal,
    string? FrFormal,
    string PhoneticInformal,
    string PhoneticFormal,
    string Phonetic,
    string? Translation,
    string? CulturalTip,
    string? Category
);

public record GrammarResponse(
    string Original,
    string Corrected,
    string Phonetic,
    List<GrammarCorrection> Corrections,
    string? CulturalTip
);

public record HistoryItemDto(
    long Id,
    string? SourceLang,
    string SourceText,
    string FrText,
    string? Phonetic,
    string? Category,
    string? Mode,
    DateTime CreatedAt
);

public record FavoriteDto(
    long Id,
    string FrText,
    string? PtText,
    string? Phonetic,
    string? Category,
    DateTime SavedAt
);

public record SettingsDto(
    string Voice,
    double Speed,
    string Region,
    bool AutoPlay,
    bool ShowPhonetic,
    bool HighlightVerbs,
    bool DailyReminder,
    string ReminderTime,
    bool HideExplanations
);

public record StatsDto(
    int WordsLearned,
    int StreakDays,
    int Accuracy
);

public record StoryPhraseDto(
    long Id,
    int OrderIndex,
    string Fr,
    string Pt,
    string SceneId
);

public record StoryVocabularyDto(
    long Id,
    int OrderIndex,
    string Fr,
    string Pt
);

public record StoryDto(
    long Id,
    string Slug,
    string Title,
    string Subtitle,
    string Icon,
    string Cover,
    string HeroId,
    string Narrative,
    int OrderIndex,
    List<StoryPhraseDto> Phrases,
    List<StoryVocabularyDto> Vocabulary
);

public record StorySummaryDto(
    long Id,
    string Slug,
    string Title,
    string Subtitle,
    string Icon,
    string Cover,
    string HeroId,
    int OrderIndex,
    int PhraseCount
);

public record WordLookupDto(
    string Word,
    string Translation
);

public record TableSizeDto(
    string TableName,
    long TotalBytes
);

public record DatabaseStatsDto(
    long DatabaseTotalBytes,
    int StoryCount,
    int PhraseCount,
    int VocabularyCount,
    int WordCount,
    int HistoryCount,
    int FavoriteCount,
    List<TableSizeDto> Tables
);

public record ConversationTurnDto(
    string Role,
    string Text
);

public record ConversationStartRequest(
    string Scenario,
    string? Region = "fr"
);

public record ConversationStartResponse(
    string Scenario,
    string Character,
    string Setting,
    string Greeting,
    string GreetingPhonetic,
    string GreetingTranslation,
    string? CulturalTip,
    List<ConversationSuggestionDto> SuggestedReplies
);

public record ConversationReplyRequest(
    string Scenario,
    List<ConversationTurnDto> History,
    string UserText,
    string? Region = "fr"
);

public record ConversationSuggestionDto(
    string Fr,
    string Pt
);

public record ConversationCorrectedTurnDto(
    string Original,
    string Corrected,
    string Phonetic,
    List<GrammarCorrection> Corrections
);

public record ConversationReplyResponse(
    string Reply,
    string ReplyPhonetic,
    string ReplyTranslation,
    List<ConversationCorrectedTurnDto> UserCorrections,
    string? CulturalTip,
    List<ConversationSuggestionDto> SuggestedReplies
);
