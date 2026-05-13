using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace StackByAivre.Server.Hubs;

[Authorize]
public class VoiceHub : Hub
{
    private Guid GetUserId() =>
        Guid.Parse(Context.User!.FindFirstValue(ClaimTypes.NameIdentifier)!);

    public async Task SendAudioChunk(Guid sessionId, byte[] audioData)
    {
        var userId = GetUserId();
        await Clients.Group($"voice_{sessionId}")
            .SendAsync("ReceiveAudioChunk", userId, audioData);
    }

    public async Task StartVoiceSession(Guid conversationId)
    {
        var userId = GetUserId();
        var sessionId = Guid.NewGuid();
        var groupName = $"voice_{sessionId}";

        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
        await Clients.Caller.SendAsync("VoiceSessionStarted", new
        {
            SessionId = sessionId,
            ConversationId = conversationId,
            StartedAt = DateTime.UtcNow
        });
    }

    public async Task EndVoiceSession(Guid sessionId)
    {
        var groupName = $"voice_{sessionId}";
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
        await Clients.Group(groupName).SendAsync("VoiceSessionEnded", sessionId);
    }

    public async Task SendTranscription(Guid sessionId, string transcription)
    {
        var userId = GetUserId();
        await Clients.Group($"voice_{sessionId}")
            .SendAsync("ReceiveTranscription", new
            {
                UserId = userId,
                Text = transcription,
                Timestamp = DateTime.UtcNow
            });
    }
}
