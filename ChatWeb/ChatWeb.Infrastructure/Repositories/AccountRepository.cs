using ChatWeb.API.Contexts;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;

namespace ChatWeb.Infrastructure.Repositories;

public class AccountRepository : IAccountRepository
{
    public ChatWebContext _context { get; set; }
    public AccountRepository(ChatWebContext context)
    {
        _context = context;
    }

    public Task DisableAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public async Task RegisterAsync(Account account)
    {
        await _context.Accounts.AddAsync(account);
        await _context.SaveChangesAsync();
    }

    public Task<Account> SearchByEmailAsync(string email)
    {
        throw new NotImplementedException();
    }

    public Task UpdateAsync(Guid Id, Account account)
    {
        throw new NotImplementedException();
    }

    public Task UpdateNameAsync(Guid Id, string name, string surname)
    {
        throw new NotImplementedException();
    }
}
