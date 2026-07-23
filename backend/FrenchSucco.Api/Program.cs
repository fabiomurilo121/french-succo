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
