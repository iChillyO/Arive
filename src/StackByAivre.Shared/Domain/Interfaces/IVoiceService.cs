using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Interfaces;

public interface IVoiceService
{
    Task<byte[]> TextToSpeechAsync(string text, VoiceModel voice, CancellationToken cancellationToken = default);
    IAsyncEnumerable<string> SpeechToTextStreamAsync(Stream audioStream, CancellationToken cancellationToken = default);
    Task StartRealtimeSessionAsync(VoiceModel voice, CancellationToken cancellationToken = default);
    Task SendAudioChunkAsync(byte[] audioData, CancellationToken cancellationToken = default);
    IAsyncEnumerable<byte[]> ReceiveAudioStreamAsync(CancellationToken cancellationToken = default);
    Task EndSessionAsync();
    bool IsSessionActive { get; }
}
