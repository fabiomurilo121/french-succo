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
