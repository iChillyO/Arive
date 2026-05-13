using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Shared.Domain.Interfaces;

public interface IAiProviderFactory
{
    IAiService GetProvider(AiProvider provider);
    IAiService GetProviderForModel(AiModel model);
}
