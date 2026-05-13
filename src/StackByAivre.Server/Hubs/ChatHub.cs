using System.Runtime.CompilerServices;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using StackByAivre.Server.Infrastructure.Data;
using StackByAivre.Shared.Domain.Entities;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.Server.Hubs;

[Authorize]
public class ChatHub : Hub
{
    private readonly AppDbContext _context;
    private readonly IAiProviderFactory _aiProviderFactory;

    public ChatHub(AppDbContext context, IAiProviderFactory aiProviderFactory)
    {
        _context = context;
        _aiProviderFactory = aiProviderFactory;
    }

    private Guid GetUserId() =>
        Guid.Parse(Context.User!.FindFirstValue(ClaimTypes.NameIdentifier)!);

    public async IAsyncEnumerable<string> StreamMessage(
        Guid conversationId,
        string message,
        AiModel? model,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        var userId = GetUserId();

        var conversation = await _context.Conversations
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.UserId == userId, cancellationToken);

        if (conversation is null)
        {
            yield return "[ERROR] Conversation not found";
            yield break;
        }

        // Save user message
        var userMessage = new Message
        {
            Id = Guid.NewGuid(),
            ConversationId = conversationId,
            Role = MessageRole.User,
            Content = message,
            CreatedAt = DateTime.UtcNow
        };
        _context.Messages.Add(userMessage);
        await _context.SaveChangesAsync(cancellationToken);

        // Build message history
        var systemPrompt = conversation.AgentType.GetSystemPrompt();
        var chatMessages = new List<ChatMessage>
        {
            new(MessageRole.System, systemPrompt)
        };

        var history = await _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync(cancellationToken);

        foreach (var msg in history)
        {
            chatMessages.Add(new ChatMessage(msg.Role, msg.Content));
        }

        var selectedModel = model ?? conversation.Model;
        var provider = _aiProviderFactory.GetProviderForModel(selectedModel);

        var fullResponse = new System.Text.StringBuilder();

        await foreach (var token in provider.StreamCompletionAsync(
            chatMessages, selectedModel, cancellationToken))
        {
            fullResponse.Append(token);
            yield return token;
        }

        // Save assistant message
        var assistantMessage = new Message
        {
            Id = Guid.NewGuid(),
            ConversationId = conversationId,
            Role = MessageRole.Assistant,
            Content = fullResponse.ToString(),
            TokenCount = fullResponse.Length / 4,
            CreatedAt = DateTime.UtcNow
        };
        _context.Messages.Add(assistantMessage);
        conversation.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync(CancellationToken.None);

        // Notify group about new message
        await Clients.Group(conversationId.ToString())
            .SendAsync("MessageCompleted", new
            {
                assistantMessage.Id,
                assistantMessage.Content,
                assistantMessage.CreatedAt
            }, CancellationToken.None);
    }

    public async Task JoinConversation(Guid conversationId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString());
    }

    public async Task LeaveConversation(Guid conversationId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, conversationId.ToString());
    }
}
