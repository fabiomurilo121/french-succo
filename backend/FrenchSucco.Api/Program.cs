using FrenchSucco.Api.Data;
using FrenchSucco.Api.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString =
    builder.Configuration.GetConnectionString("Postgres")
    ?? Environment.GetEnvironmentVariable("POSTGRES_CONNECTION")
    ?? "Host=postgres;Port=5432;Database=french_succo;Username=succo;Password=succo_secret";

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddHttpClient<IMiniMaxService, MiniMaxService>();

builder.Services.AddScoped<ITranslationService, TranslationService>();
builder.Services.AddScoped<IGrammarService, GrammarService>();
builder.Services.AddScoped<IPhoneticService, PhoneticService>();
builder.Services.AddScoped<ITtsService, TtsService>();
builder.Services.AddScoped<IStatsService, StatsService>();
builder.Services.AddScoped<IConversationService, ConversationService>();
builder.Services.AddScoped<IWritingService, WritingService>();
builder.Services.AddScoped<ILearnedWordsValidationService, LearnedWordsValidationService>();

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("web", policy =>
    {
        policy.WithOrigins(
                "http://localhost",
                "http://localhost:5173",
                "http://localhost:4173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    db.Database.EnsureCreated();
    await EnsureAudioCacheTable(db, logger);
    await EnsureUserSettingsColumns(db, logger);
    await EnsureLearnedWordsTable(db, logger);
    await DataSeeder.SeedAsync(db, logger);
}

static async Task EnsureAudioCacheTable(AppDbContext db, ILogger logger)
{
    try
    {
        await db.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS audio_cache (
                id BIGSERIAL PRIMARY KEY,
                hash VARCHAR(64) NOT NULL UNIQUE,
                text TEXT NOT NULL,
                voice VARCHAR(20) NOT NULL DEFAULT 'female',
                speed DOUBLE PRECISION NOT NULL DEFAULT 1.0,
                region VARCHAR(10) NOT NULL DEFAULT 'fr',
                audio_bytes BYTEA NOT NULL,
                bytes_size INTEGER NOT NULL DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                last_used_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
                use_count INTEGER NOT NULL DEFAULT 1
            );
            CREATE INDEX IF NOT EXISTS ix_audio_cache_last_used_at ON audio_cache (last_used_at);
        ");
        logger.LogInformation("audio_cache table ready.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to ensure audio_cache table");
    }
}

static async Task EnsureUserSettingsColumns(AppDbContext db, ILogger logger)
{
    try
    {
        await db.Database.ExecuteSqlRawAsync(@"
            ALTER TABLE user_settings
                ADD COLUMN IF NOT EXISTS validate_with_dictionary BOOLEAN NOT NULL DEFAULT TRUE,
                ADD COLUMN IF NOT EXISTS validate_with_levenshtein BOOLEAN NOT NULL DEFAULT TRUE,
                ADD COLUMN IF NOT EXISTS validate_with_ai BOOLEAN NOT NULL DEFAULT FALSE;
        ");
        logger.LogInformation("user_settings validation columns ready.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to ensure user_settings validation columns");
    }
}

static async Task EnsureLearnedWordsTable(AppDbContext db, ILogger logger)
{
    try
    {
        await db.Database.ExecuteSqlRawAsync(@"
            CREATE TABLE IF NOT EXISTS learned_words (
                id BIGSERIAL PRIMARY KEY,
                user_id VARCHAR(64) NOT NULL,
                word VARCHAR(120) NOT NULL,
                word_normalized VARCHAR(120) NOT NULL,
                translation VARCHAR(400) NOT NULL,
                phonetic VARCHAR(200),
                category VARCHAR(40),
                notes VARCHAR(1000),
                context VARCHAR(400),
                review_count INTEGER NOT NULL DEFAULT 0,
                last_reviewed_at TIMESTAMP WITH TIME ZONE,
                learned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
            );
            CREATE UNIQUE INDEX IF NOT EXISTS ix_learned_words_user_word
                ON learned_words (user_id, word_normalized);
            CREATE INDEX IF NOT EXISTS ix_learned_words_user_id
                ON learned_words (user_id);
            CREATE INDEX IF NOT EXISTS ix_learned_words_category
                ON learned_words (category);
        ");
        logger.LogInformation("learned_words table ready.");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Failed to ensure learned_words table");
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("web");
app.UseStaticFiles();

app.MapControllers();

app.MapGet("/healthz", () => Results.Ok(new { status = "ok", service = "french-succo-api" }));

app.MapFallbackToFile("index.html");

app.Run();

public partial class Program { }
