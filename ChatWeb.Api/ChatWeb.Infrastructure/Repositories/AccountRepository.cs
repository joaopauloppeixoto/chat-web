using ChatWeb.API.Contexts;
using ChatWeb.Common.CustomExceptions;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
using Microsoft.EntityFrameworkCore;

namespace ChatWeb.Infrastructure.Repositories;

public class AccountRepository : IAccountRepository
{
    public ChatWebContext _context { get; set; }
    public AccountRepository(ChatWebContext context)
    {
        _context = context;
    }

    public async Task<Account?> GetAsync(Guid? guid)
    {
        return await _context.Accounts.FirstOrDefaultAsync(a => a.Id == guid);
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

    public async Task<Account> SearchByEmailAsync(string email)
    {
        var infos = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == email);
        
        if (infos == null)
        {
            throw new InvalidAccountException();
        }

        return infos;
    }

    public async Task UpdateAsync(Guid id, Account account)
    {
        throw new NotImplementedException();
    }

    public Task UpdateNameAsync(Guid id, string name, string surname)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateLastLoginAsync(string email)
    {
        var account = await SearchByEmailAsync(email);

        account.LastSeenAt = DateTime.UtcNow;

        _context.SaveChanges();
    }

    public async Task ValidateLoginAsync(string email, string passwordHash)
    {
        if (!await _context.Accounts.AnyAsync(a => a.Email == email && a.PasswordHash == passwordHash))
        {
            throw new InvalidLoginOrPasswordException();
        }
    }

    public async Task RenameAccountAsync(Guid id, string name, string surname)
    {
        var account = await _context.Accounts.FirstOrDefaultAsync(a => a.Id == id);

        if (account == null) throw new InvalidAccountException();

        account.Name = name;
        account.Surname = surname;

        await _context.SaveChangesAsync();
    }
}
