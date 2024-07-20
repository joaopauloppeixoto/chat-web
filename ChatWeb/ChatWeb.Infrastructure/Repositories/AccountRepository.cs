﻿using ChatWeb.API.Contexts;
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
        return await _context.Accounts.SingleOrDefaultAsync(a => a.Email == email);
    }

    public async Task UpdateAsync(Guid Id, Account account)
    {
        throw new NotImplementedException();
    }

    public Task UpdateNameAsync(Guid Id, string name, string surname)
    {
        throw new NotImplementedException();
    }

    public async Task UpdateLastLoginAsync(string email)
    {
        var account = await SearchByEmailAsync(email);

        account.LastLogin = DateTime.UtcNow;

        _context.SaveChanges();
    }

    public async Task ValidateLoginAsync(string email, string passwordHash)
    {
        if (!await _context.Accounts.AnyAsync(a => a.Email == email && a.PasswordHash == passwordHash))
        {
            throw new InvalidLoginOrPasswordException();
        }
    }
}
