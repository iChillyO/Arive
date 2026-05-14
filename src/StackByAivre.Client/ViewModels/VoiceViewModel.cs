using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Client.ViewModels;

public partial class VoiceViewModel : ObservableObject
{
    [ObservableProperty] private bool _isCallActive;
    [ObservableProperty] private bool _isMuted;
    [ObservableProperty] private bool _isSpeakerOff;
    [ObservableProperty] private TimeSpan _callDuration;
    [ObservableProperty] private VoiceModel _selectedVoice = VoiceModel.Alloy;
    [ObservableProperty] private string _statusText = "Ready";

    private System.Timers.Timer? _durationTimer;

    public ObservableCollection<VoiceModel> AvailableVoices { get; } = new(Enum.GetValues<VoiceModel>());

    [RelayCommand]
    private void StartCall()
    {
        IsCallActive = true;
        StatusText = "Listening...";
        CallDuration = TimeSpan.Zero;
        _durationTimer = new System.Timers.Timer(1000);
        _durationTimer.Elapsed += (_, _) => CallDuration = CallDuration.Add(TimeSpan.FromSeconds(1));
        _durationTimer.Start();
    }

    [RelayCommand]
    private void EndCall()
    {
        IsCallActive = false;
        StatusText = "Ready";
        _durationTimer?.Stop();
        _durationTimer?.Dispose();
    }

    [RelayCommand]
    private void ToggleMute() => IsMuted = !IsMuted;

    [RelayCommand]
    private void ToggleSpeaker() => IsSpeakerOff = !IsSpeakerOff;
}
