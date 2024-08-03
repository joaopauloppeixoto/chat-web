using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
using Microsoft.EntityFrameworkCore;

namespace ChatWeb.API.Contexts;

public class ChatWebContext : DbContext
{
    #region Account aggregate
    public DbSet<Account> Accounts { get; set; }
    #endregion

    #region Messager aggregate
    public DbSet<Message> Messages { get; set; }
    public DbSet<Group> Groups { get; set; }
    public DbSet<GroupParticipant> GroupParticipants { get; set; }
    #endregion

    public ChatWebContext()
    {

    }

    public ChatWebContext(DbContextOptions opt) : base (opt)
    {
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<GroupParticipant>().HasKey(x => new { x.GroupId, x.AccountId });
    }
}
