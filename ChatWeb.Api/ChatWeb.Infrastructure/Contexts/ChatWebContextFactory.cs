using ChatWeb.API.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ChatWeb.Infrastructure.Contexts;

public class ChatWebContextFactory : IDesignTimeDbContextFactory<ChatWebContext>
{
    public ChatWebContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<ChatWebContext>();
        if (args.Length > 0)
        {
            optionsBuilder.UseMySQL(args[0]);

            return new ChatWebContext(optionsBuilder.Options);
        }
        else
        {
            throw new ArgumentException("You need to pass the ConnectionString as the first argument.");
        }
    }
}
