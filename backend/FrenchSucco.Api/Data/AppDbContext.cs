using FrenchSucco.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TranslationItem> History => Set<TranslationItem>();
    public DbSet<FavoriteItem> Favorites => Set<FavoriteItem>();
    public DbSet<UserSettings> UserSettings => Set<UserSettings>();
    public DbSet<Story> Stories => Set<Story>();
    public DbSet<StoryPhrase> StoryPhrases => Set<StoryPhrase>();
    public DbSet<StoryVocabulary> StoryVocabulary => Set<StoryVocabulary>();
    public DbSet<WordDictionary> Words => Set<WordDictionary>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TranslationItem>(entity =>
        {
            entity.ToTable("history");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id").HasMaxLength(64).IsRequired();
            entity.Property(e => e.SourceLang).HasColumnName("source_lang").HasMaxLength(8);
            entity.Property(e => e.SourceText).HasColumnName("source_text").IsRequired();
            entity.Property(e => e.FrText).HasColumnName("fr_text").IsRequired();
            entity.Property(e => e.Phonetic).HasColumnName("phonetic");
            entity.Property(e => e.Category).HasColumnName("category").HasMaxLength(40);
            entity.Property(e => e.Mode).HasColumnName("mode").HasMaxLength(20);
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.HasIndex(e => e.UserId);
        });

        modelBuilder.Entity<FavoriteItem>(entity =>
        {
            entity.ToTable("favorites");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.UserId).HasColumnName("user_id").HasMaxLength(64).IsRequired();
            entity.Property(e => e.FrText).HasColumnName("fr_text").IsRequired();
            entity.Property(e => e.PtText).HasColumnName("pt_text");
            entity.Property(e => e.Phonetic).HasColumnName("phonetic");
            entity.Property(e => e.Category).HasColumnName("category").HasMaxLength(40);
            entity.Property(e => e.SavedAt).HasColumnName("saved_at");
            entity.HasIndex(e => e.UserId);
        });

        modelBuilder.Entity<UserSettings>(entity =>
        {
            entity.ToTable("user_settings");
            entity.HasKey(e => e.UserId);
            entity.Property(e => e.UserId).HasColumnName("user_id").HasMaxLength(64);
            entity.Property(e => e.Voice).HasColumnName("voice").HasMaxLength(20);
            entity.Property(e => e.Speed).HasColumnName("speed");
            entity.Property(e => e.Region).HasColumnName("region").HasMaxLength(10);
            entity.Property(e => e.AutoPlay).HasColumnName("auto_play");
            entity.Property(e => e.ShowPhonetic).HasColumnName("show_phonetic");
            entity.Property(e => e.HighlightVerbs).HasColumnName("highlight_verbs");
            entity.Property(e => e.DailyReminder).HasColumnName("daily_reminder");
            entity.Property(e => e.ReminderTime).HasColumnName("reminder_time").HasMaxLength(10);
            entity.Property(e => e.HideExplanations).HasColumnName("hide_explanations");
        });

        modelBuilder.Entity<Story>(entity =>
        {
            entity.ToTable("stories");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Slug).HasColumnName("slug").HasMaxLength(60).IsRequired();
            entity.Property(e => e.Title).HasColumnName("title").IsRequired();
            entity.Property(e => e.Subtitle).HasColumnName("subtitle").IsRequired();
            entity.Property(e => e.Icon).HasColumnName("icon").HasMaxLength(40);
            entity.Property(e => e.Cover).HasColumnName("cover").HasMaxLength(10);
            entity.Property(e => e.HeroId).HasColumnName("hero_id").HasMaxLength(60);
            entity.Property(e => e.Narrative).HasColumnName("narrative").IsRequired();
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.HasIndex(e => e.Slug).IsUnique();
            entity.HasIndex(e => e.OrderIndex);
            entity.HasMany(e => e.Phrases)
                  .WithOne()
                  .HasForeignKey(p => p.StoryId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.HasMany(e => e.Vocabulary)
                  .WithOne()
                  .HasForeignKey(v => v.StoryId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        modelBuilder.Entity<StoryPhrase>(entity =>
        {
            entity.ToTable("story_phrases");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.StoryId).HasColumnName("story_id");
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            entity.Property(e => e.Fr).HasColumnName("fr").IsRequired();
            entity.Property(e => e.Pt).HasColumnName("pt").IsRequired();
            entity.Property(e => e.SceneId).HasColumnName("scene_id").HasMaxLength(60);
            entity.HasIndex(e => e.StoryId);
        });

        modelBuilder.Entity<StoryVocabulary>(entity =>
        {
            entity.ToTable("story_vocabulary");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.StoryId).HasColumnName("story_id");
            entity.Property(e => e.OrderIndex).HasColumnName("order_index");
            entity.Property(e => e.Fr).HasColumnName("fr").IsRequired();
            entity.Property(e => e.Pt).HasColumnName("pt").IsRequired();
            entity.HasIndex(e => e.StoryId);
        });

        modelBuilder.Entity<WordDictionary>(entity =>
        {
            entity.ToTable("word_dictionary");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Word).HasColumnName("word").HasMaxLength(60).IsRequired();
            entity.Property(e => e.Translation).HasColumnName("translation").IsRequired();
            entity.HasIndex(e => e.Word).IsUnique();
        });
    }
}
