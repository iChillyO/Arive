using System.Collections.ObjectModel;
using System.Text.Json;
using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using StackByAivre.Client.Services;
using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Client.ViewModels;

public partial class ChatViewModel : ObservableObject
{
    private readonly ApiClientService _api;
    private Guid _conversationId;
    private CancellationTokenSource? _streamCts;

    [ObservableProperty] private string _inputText = string.Empty;
    [ObservableProperty] private bool _isStreaming;
    [ObservableProperty] private AiModel _selectedModel = AiModel.Gpt4o;
    [ObservableProperty] private AgentType _agentType = AgentType.Chat;
    [ObservableProperty] private string _currentStreamingText = string.Empty;

    public ObservableCollection<ChatMessageItem> Messages { get; } = new();

    public ChatViewModel(ApiClientService api)
    {
        _api = api;
    }

    public async Task InitializeAsync(AgentType agentType = AgentType.Chat)
    {
        AgentType = agentType;
        try
        {
            var result = await _api.PostAsync<ConversationResult>("api/chat/conversations", new
            {
                Title = $"New {agentType.GetDisplayName()} Session",
                AgentType = agentType,
                Model = SelectedModel
            });
            if (result != null)
                _conversationId = result.Id;
        }
        catch { /* Server may not be running */ }
    }

    [RelayCommand]
    private async Task SendMessageAsync()
    {
        if (string.IsNullOrWhiteSpace(InputText) || IsStreaming) return;

        var userText = InputText.Trim();
        InputText = string.Empty;

        Messages.Add(new ChatMessageItem(MessageRole.User, userText));

        IsStreaming = true;
        CurrentStreamingText = string.Empty;
        var assistantMsg = new ChatMessageItem(MessageRole.Assistant, string.Empty) { IsStreaming = true };
        Messages.Add(assistantMsg);

        _streamCts = new CancellationTokenSource();

        try
        {
            await foreach (var token in _api.StreamAsync(
                $"api/chat/conversations/{_conversationId}/stream",
                new { Message = userText, Model = SelectedModel }))
            {
                if (_streamCts.Token.IsCancellationRequested) break;

                // Parse the JSON token envelope
                try
                {
                    var doc = JsonDocument.Parse(token);
                    if (doc.RootElement.TryGetProperty("token", out var t))
                    {
                        var text = t.GetString() ?? "";
                        CurrentStreamingText += text;
                    }
                }
                catch
                {
                    CurrentStreamingText += token;
                }

                assistantMsg.Content = CurrentStreamingText;
            }
        }
        catch (OperationCanceledException) { }
        catch (Exception ex)
        {
            CurrentStreamingText += $"\n[Error: {ex.Message}]";
            assistantMsg.Content = CurrentStreamingText;
        }
        finally
        {
            assistantMsg.IsStreaming = false;
            IsStreaming = false;
        }
    }

    [RelayCommand]
    private void StopStreaming() => _streamCts?.Cancel();
}

public partial class ChatMessageItem : ObservableObject
{
    [ObservableProperty] private MessageRole _role;
    [ObservableProperty] private string _content;
    [ObservableProperty] private bool _isStreaming;
    public DateTime Timestamp { get; } = DateTime.Now;

    public ChatMessageItem(MessageRole role, string content)
    {
        _role = role;
        _content = content;
    }
}

public record ConversationResult(Guid Id, string Title, AgentType AgentType);
