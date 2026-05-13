using System.Runtime.CompilerServices;
using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Interfaces;

public record ChatMessage(MessageRole Role, string Content);

public interface IAiService
{
    AiProvider Provider { get; }

    IAsyncEnumerable<string> StreamCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        CancellationToken cancellationToken = default);

    Task<string> GetCompletionAsync(
        IEnumerable<ChatMessage> messages,
        AiModel model,
        CancellationToken cancellationToken = default);
}
