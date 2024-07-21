using ChatWeb.API.Contexts;
using ChatWeb.Common.CustomExceptions;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
using Microsoft.EntityFrameworkCore;

namespace ChatWeb.Infrastructure.Repositories;

public class MessageRepository : IMessageRepository
{
    public ChatWebContext _context { get; set; }
    public MessageRepository(ChatWebContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Message message)
    {
        await _context.Messages.AddAsync(message);
        await _context.SaveChangesAsync();
    }

    public async Task DisableAsync(Guid id)
    {
        var message = (
            await _context.Messages.SingleOrDefaultAsync(m => m.Id == id)
        ) ?? throw new EntityNotFoundException($"Message with Id {id} not found.");

        message.Enable = false;
    }

    public async Task UpdateAsync(Guid id, Message message)
    {
        throw new NotImplementedException();
    }

    public async Task<IList<Message>> GetMessages(Guid userId, Guid targetId)
    {
        var messages = await _context.Messages.Where(m =>
            m.SenderId == userId && m.ReceiverId == targetId ||
            m.ReceiverId == userId && m.SenderId == targetId
        ).ToListAsync();

        return messages;
    }
}
