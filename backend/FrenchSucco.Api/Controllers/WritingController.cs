using FrenchSucco.Api.Dtos;
using FrenchSucco.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/writing")]
public class WritingController : ControllerBase
{
    private readonly IWritingService _service;
    private readonly ILogger<WritingController> _logger;

    public WritingController(IWritingService service, ILogger<WritingController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpPost("grade")]
    public async Task<ActionResult<WritingGradeResponse>> Grade(
        [FromBody] WritingGradeRequest request,
        CancellationToken ct)
    {
        if (request is null)
            return BadRequest(new { message = "Corpo da requisição é obrigatório." });

        if (string.IsNullOrWhiteSpace(request.Text))
            return BadRequest(new { message = "O texto é obrigatório." });

        if (request.Words is null || request.Words.Length < 5)
            return BadRequest(new { message = "A lista de palavras deve ter ao menos 5 itens." });

        try
        {
            var result = await _service.GradeAsync(
                request with { Text = request.Text.Trim() }, ct);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "Upstream MiniMax failed for writing grade");
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = "Serviço de avaliação temporariamente indisponível." });
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = ex.Message });
        }
    }

    [HttpPost("words")]
    public async Task<ActionResult<WritingWordsResponse>> Words(
        [FromBody] WritingWordsRequest request,
        CancellationToken ct)
    {
        try
        {
            var result = await _service.GenerateWordsAsync(request, ct);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "Upstream MiniMax failed for writing words");
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = "Serviço de geração de palavras temporariamente indisponível." });
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = ex.Message });
        }
    }
}