using System.ComponentModel.DataAnnotations;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StackByAivre.Server.Infrastructure.Data;
using StackByAivre.Shared.Domain.Entities;
using StackByAivre.Shared.Domain.Enums;
using StackByAivre.Shared.Domain.Interfaces;

namespace StackByAivre.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ChatController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IAiProviderFactory _aiProviderFactory;

    public ChatController(AppDbContext context, IAiProviderFactory aiProviderFactory)
    {
        _context = context;
        _aiProviderFactory = aiProviderFactory;
    }

    private Guid GetUserId() =>
        Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet("conversations")]
    public async Task<ActionResult<IEnumerable<object>>> GetConversations()
    {
        var userId = GetUserId();

        var conversations = await _context.Conversations
            .Where(c => c.UserId == userId)
            .OrderByDescending(c => c.UpdatedAt)
            .Take(50)
            .Select(c => new
            {
                c.Id,
                c.Title,
                c.AgentType,
                c.Model,
                c.IsActive,
                c.CreatedAt,
                c.UpdatedAt,
                MessageCount = c.Messages.Count
            })
            .ToListAsync();

        return Ok(conversations);
    }

    [HttpPost("conversations")]
    public async Task<ActionResult<object>> CreateConversation([FromBody] CreateConversationDto dto)
    {
        var userId = GetUserId();

        var conversation = new Conversation
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Title = dto.Title ?? "New Conversation",
            AgentType = dto.AgentType,
            Model = dto.Model,
            IsActive = true,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Conversations.Add(conversation);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            conversation.Id,
            conversation.Title,
            conversation.AgentType,
            conversation.Model,
            conversation.IsActive,
            conversation.CreatedAt,
            conversation.UpdatedAt,
            MessageCount = 0
        });
    }

    [HttpGet("conversations/{conversationId}/messages")]
    public async Task<ActionResult<IEnumerable<object>>> GetMessages(Guid conversationId)
    {
        var userId = GetUserId();

        var conversation = await _context.Conversations
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.UserId == userId);

        if (conversation is null)
            return NotFound(new { message = "Conversation not found" });

        var messages = await _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .Select(m => new
            {
                m.Id,
                m.Role,
                m.Content,
                m.AttachmentUrl,
                m.AttachmentType,
                m.TokenCount,
                m.CreatedAt
            })
            .ToListAsync();

        return Ok(messages);
    }

    [HttpPost("conversations/{conversationId}/stream")]
    public async Task StreamCompletion(Guid conversationId, [FromBody] StreamRequestDto dto)
    {
        var userId = GetUserId();

        var conversation = await _context.Conversations
            .Include(c => c.Messages)
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.UserId == userId);

        if (conversation is null)
        {
            Response.StatusCode = 404;
            return;
        }

        // Save user message
        var userMessage = new Message
        {
            Id = Guid.NewGuid(),
            ConversationId = conversationId,
            Role = MessageRole.User,
            Content = dto.Message,
            CreatedAt = DateTime.UtcNow
        };
        _context.Messages.Add(userMessage);
        await _context.SaveChangesAsync();

        // Build message history with system prompt
        var systemPrompt = conversation.AgentType.GetSystemPrompt();
        var chatMessages = new List<ChatMessage>
        {
            new(MessageRole.System, systemPrompt)
        };

        var history = await _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync();

        foreach (var msg in history)
        {
            chatMessages.Add(new ChatMessage(msg.Role, msg.Content));
        }

        // Set up SSE response
        Response.ContentType = "text/event-stream";
        Response.Headers.CacheControl = "no-cache";
        Response.Headers.Connection = "keep-alive";

        var model = dto.Model ?? conversation.Model;
        var provider = _aiProviderFactory.GetProviderForModel(model);

        var fullResponse = new System.Text.StringBuilder();

        try
        {
            await foreach (var token in provider.StreamCompletionAsync(
                chatMessages, model, HttpContext.RequestAborted))
            {
                fullResponse.Append(token);
                var data = System.Text.Json.JsonSerializer.Serialize(new { token });
                await Response.WriteAsync($"data: {data}\n\n", HttpContext.RequestAborted);
                await Response.Body.FlushAsync(HttpContext.RequestAborted);
            }

            // Send done event
            await Response.WriteAsync("data: [DONE]\n\n", HttpContext.RequestAborted);
            await Response.Body.FlushAsync(HttpContext.RequestAborted);
        }
        catch (OperationCanceledException)
        {
            // Client disconnected
        }

        // Save assistant message
        var assistantMessage = new Message
        {
            Id = Guid.NewGuid(),
            ConversationId = conversationId,
            Role = MessageRole.Assistant,
            Content = fullResponse.ToString(),
            TokenCount = fullResponse.Length / 4, // Rough estimate
            CreatedAt = DateTime.UtcNow
        };
        _context.Messages.Add(assistantMessage);

        // Auto-title if this is the first exchange
        if (conversation.Title == "New Conversation" && history.Count <= 2)
        {
            var titleContent = dto.Message.Length > 50
                ? dto.Message[..50] + "..."
                : dto.Message;
            conversation.Title = titleContent;
        }

        conversation.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();
    }

    [HttpDelete("conversations/{conversationId}")]
    public async Task<ActionResult> DeleteConversation(Guid conversationId)
    {
        var userId = GetUserId();

        var conversation = await _context.Conversations
            .FirstOrDefaultAsync(c => c.Id == conversationId && c.UserId == userId);

        if (conversation is null)
            return NotFound(new { message = "Conversation not found" });

        _context.Conversations.Remove(conversation);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}

// DTOs
public record CreateConversationDto(
    string? Title,
    [Required] AgentType AgentType,
    [Required] AiModel Model);

public record StreamRequestDto(
    [Required] string Message,
    AiModel? Model);
