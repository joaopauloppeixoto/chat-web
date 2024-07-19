using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
using Microsoft.EntityFrameworkCore;

namespace ChatWeb.API.Contexts;

public class ChatWebContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Message> Messages { get; set; }

    public ChatWebContext(DbContextOptions opt) : base (opt)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }
}
