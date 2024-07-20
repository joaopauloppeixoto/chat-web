using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
using Microsoft.EntityFrameworkCore;
using System.Configuration;

namespace ChatWeb.API.Contexts;

public class ChatWebContext : DbContext
{
    public DbSet<Account> Accounts { get; set; }
    public DbSet<Message> Messages { get; set; }

    public ChatWebContext()
    {

    }

    public ChatWebContext(DbContextOptions opt) : base (opt)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}
