using FrenchSucco.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FrenchSucco.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<TranslationItem> History => Set<TranslationItem>();
    public DbSet<FavoriteItem> Favorites => Set<FavoriteItem>();
    public DbSet<UserSettings> UserSettings => Set<UserSettings>();

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
    }
}
