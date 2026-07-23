namespace FrenchSucco.Api.Models;

public class TranslationItem
{
    public long Id { get; set; }
    public string UserId { get; set; } = "default";
    public string? SourceLang { get; set; }
    public string SourceText { get; set; } = string.Empty;
    public string FrText { get; set; } = string.Empty;
    public string? Phonetic { get; set; }
    public string? Category { get; set; }
    public string? Mode { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class FavoriteItem
{
    public long Id { get; set; }
    public string UserId { get; set; } = "default";
    public string FrText { get; set; } = string.Empty;
    public string? PtText { get; set; }
    public string? Phonetic { get; set; }
    public string? Category { get; set; }
    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
}

public class UserSettings
{
    public string UserId { get; set; } = "default";
    public string Voice { get; set; } = "female";
    public double Speed { get; set; } = 1.0;
    public string Region { get; set; } = "fr";
    public bool AutoPlay { get; set; } = true;
    public bool ShowPhonetic { get; set; } = true;
    public bool HighlightVerbs { get; set; } = true;
    public bool DailyReminder { get; set; } = true;
    public string ReminderTime { get; set; } = "20:00";
    public bool HideExplanations { get; set; }
}

public class Story
{
    public long Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Icon { get; set; } = "book";
    public string Cover { get; set; } = string.Empty;
    public string HeroId { get; set; } = string.Empty;
    public string Narrative { get; set; } = string.Empty;
    public int OrderIndex { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<StoryPhrase> Phrases { get; set; } = new();
    public List<StoryVocabulary> Vocabulary { get; set; } = new();
}

public class StoryPhrase
{
    public long Id { get; set; }
    public long StoryId { get; set; }
    public int OrderIndex { get; set; }
    public string Fr { get; set; } = string.Empty;
    public string Pt { get; set; } = string.Empty;
    public string SceneId { get; set; } = string.Empty;
}

public class StoryVocabulary
{
    public long Id { get; set; }
    public long StoryId { get; set; }
    public int OrderIndex { get; set; }
    public string Fr { get; set; } = string.Empty;
    public string Pt { get; set; } = string.Empty;
}

public class WordDictionary
{
    public long Id { get; set; }
    public string Word { get; set; } = string.Empty;
    public string Translation { get; set; } = string.Empty;
}

public class AudioCacheEntry
{
    public long Id { get; set; }
    public string Hash { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public string Voice { get; set; } = "female";
    public double Speed { get; set; } = 1.0;
    public string Region { get; set; } = "fr";
    public byte[] AudioBytes { get; set; } = Array.Empty<byte>();
    public int BytesSize { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime LastUsedAt { get; set; } = DateTime.UtcNow;
    public int UseCount { get; set; } = 1;
}
