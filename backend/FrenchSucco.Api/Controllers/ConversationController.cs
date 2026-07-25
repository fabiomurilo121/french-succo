using FrenchSucco.Api.Dtos;
using FrenchSucco.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace FrenchSucco.Api.Controllers;

[ApiController]
[Route("api/conversation")]
public class ConversationController : ControllerBase
{
    private readonly IConversationService _service;
    private readonly ILogger<ConversationController> _logger;

    public ConversationController(IConversationService service, ILogger<ConversationController> logger)
    {
        _service = service;
        _logger = logger;
    }

    [HttpPost("start")]
    public async Task<ActionResult<ConversationStartResponse>> Start(
        [FromBody] ConversationStartRequest request,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Scenario))
            return BadRequest(new { message = "Cenário é obrigatório." });

        try
        {
            var result = await _service.StartAsync(
                request.Scenario.Trim().ToLowerInvariant(),
                request.Region ?? "fr",
                ct);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "Upstream MiniMax failed for conversation start");
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = "Serviço de conversação temporariamente indisponível. Tente novamente." });
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = ex.Message });
        }
    }

    [HttpPost("reply")]
    public async Task<ActionResult<ConversationReplyResponse>> Reply(
        [FromBody] ConversationReplyRequest request,
        CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Scenario))
            return BadRequest(new { message = "Cenário é obrigatório." });

        if (string.IsNullOrWhiteSpace(request.UserText))
            return BadRequest(new { message = "Mensagem do usuário é obrigatória." });

        try
        {
            var history = request.History ?? new List<ConversationTurnDto>();
            var result = await _service.ReplyAsync(
                request.Scenario.Trim().ToLowerInvariant(),
                history,
                request.UserText.Trim(),
                request.Region ?? "fr",
                ct);
            return Ok(result);
        }
        catch (HttpRequestException ex)
        {
            _logger.LogWarning(ex, "Upstream MiniMax failed for conversation reply");
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = "Serviço de conversação temporariamente indisponível. Tente novamente." });
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(StatusCodes.Status502BadGateway,
                new { message = ex.Message });
        }
    }
}
