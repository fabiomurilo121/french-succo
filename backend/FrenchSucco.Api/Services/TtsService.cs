namespace FrenchSucco.Api.Services;

public interface ITtsService
{
    Task<byte[]> SynthesizeAsync(string text, string voice, double speed, string region, CancellationToken ct = default);
}

public class TtsService : ITtsService
{
    private readonly IMiniMaxService _miniMax;

    public TtsService(IMiniMaxService miniMax)
    {
        _miniMax = miniMax;
    }

    public async Task<byte[]> SynthesizeAsync(string text, string voice, double speed, string region, CancellationToken ct = default)
    {
        return await _miniMax.SynthesizeSpeechAsync(text, voice, speed, region, ct);
    }
}
