using FrenchSucco.Api.Dtos;
using FrenchSucco.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/translate")]
public class TranslateController : ControllerBase
{
    private readonly ITranslationService _service;
    private readonly IPhoneticService _phonetic;

    public TranslateController(ITranslationService service, IPhoneticService phonetic)
    {
        _service = service;
        _phonetic = phonetic;
    }

    [HttpPost]
    public async Task<ActionResult<TranslationResponse>> Translate(
        [FromBody] TranslateRequest request,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
            return BadRequest(new { message = "Texto é obrigatório." });

        var result = await _service.TranslateAsync(
            request.Text.Trim(),
            request.SourceLang,
            request.Region ?? "fr",
            ct);

        return Ok(result);
    }
}

[ApiController]
[Route("api/correct")]
public class CorrectController : ControllerBase
{
    private readonly IGrammarService _service;

    public CorrectController(IGrammarService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<ActionResult<GrammarResponse>> Correct(
        [FromBody] GrammarRequest request,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
            return BadRequest(new { message = "Texto é obrigatório." });

        var result = await _service.CorrectAsync(request.Text.Trim(), request.Region ?? "fr", ct);
        return Ok(result);
    }
}

[ApiController]
[Route("api/audio")]
public class AudioController : ControllerBase
{
    private readonly ITtsService _tts;

    public AudioController(ITtsService tts)
    {
        _tts = tts;
    }

    [HttpGet]
    public async Task<IActionResult> Get(
        [FromQuery] string text,
        [FromQuery] string voice = "female",
        [FromQuery] double speed = 1.0,
        [FromQuery] string region = "fr",
        CancellationToken ct = default)
    {
        if (string.IsNullOrWhiteSpace(text))
            return BadRequest(new { message = "Texto é obrigatório." });

        try
        {
            var bytes = await _tts.SynthesizeAsync(text, voice, speed, region, ct);
            return File(bytes, "audio/mpeg");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status502BadGateway, new { message = ex.Message });
        }
    }
}
