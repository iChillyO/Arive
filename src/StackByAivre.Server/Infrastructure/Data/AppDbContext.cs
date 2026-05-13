using Microsoft.EntityFrameworkCore;
using StackByAivre.Shared.Domain.Entities;
using StackByAivre.Shared.Domain.Enums;

namespace StackByAivre.Server.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Conversation> Conversations => Set<Conversation>();
    public DbSet<Message> Messages => Set<Message>();
    public DbSet<WidgetConfig> WidgetConfigs => Set<WidgetConfig>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // User configuration
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => e.Email).IsUnique();
            entity.HasIndex(e => e.Username).IsUnique();

            entity.Property(e => e.Username).HasMaxLength(50);
            entity.Property(e => e.DisplayName).HasMaxLength(100);
            entity.Property(e => e.Email).HasMaxLength(256);
            entity.Property(e => e.PasswordHash).HasMaxLength(256);
            entity.Property(e => e.Gender).HasMaxLength(20);
            entity.Property(e => e.AvatarUrl).HasMaxLength(500);
            entity.Property(e => e.AccentColor).HasMaxLength(20);
            entity.Property(e => e.WallpaperPath).HasMaxLength(500);

            entity.Property(e => e.Theme)
                .HasConversion<string>()
                .HasMaxLength(20);

            entity.Property(e => e.DefaultAiModel)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.Property(e => e.DefaultVoiceModel)
                .HasConversion<string>()
                .HasMaxLength(30);
        });

        // Conversation configuration
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).HasMaxLength(200);

            entity.Property(e => e.AgentType)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.Property(e => e.Model)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.HasOne(e => e.User)
                .WithMany(u => u.Conversations)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Message configuration
        modelBuilder.Entity<Message>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Content).HasColumnType("text");
            entity.Property(e => e.AttachmentUrl).HasMaxLength(500);
            entity.Property(e => e.AttachmentType).HasMaxLength(50);

            entity.Property(e => e.Role)
                .HasConversion<string>()
                .HasMaxLength(20);

            entity.HasOne(e => e.Conversation)
                .WithMany(c => c.Messages)
                .HasForeignKey(e => e.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // WidgetConfig configuration
        modelBuilder.Entity<WidgetConfig>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.ConfigJson).HasColumnType("text");

            entity.Property(e => e.Type)
                .HasConversion<string>()
                .HasMaxLength(30);

            entity.HasOne(e => e.User)
                .WithMany(u => u.Widgets)
                .HasForeignKey(e => e.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
