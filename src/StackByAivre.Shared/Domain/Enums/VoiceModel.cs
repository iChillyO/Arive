namespace StackByAivre.Shared.Domain.Enums;

public enum VoiceModel
{
    Alloy,
    Echo,
    Nova,
    Shimmer,
    Onyx,
    Fable
}

public static class VoiceModelExtensions
{
    public static string ToApiIdentifier(this VoiceModel model) => model switch
    {
        VoiceModel.Alloy => "alloy",
        VoiceModel.Echo => "echo",
        VoiceModel.Nova => "nova",
        VoiceModel.Shimmer => "shimmer",
        VoiceModel.Onyx => "onyx",
        VoiceModel.Fable => "fable",
        _ => throw new ArgumentOutOfRangeException(nameof(model), model, "Unknown voice model")
    };
}
