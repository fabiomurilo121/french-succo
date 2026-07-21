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
    await DataSeeder.SeedAsync(db, logger);
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
