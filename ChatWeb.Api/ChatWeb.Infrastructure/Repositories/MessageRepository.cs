using ChatWeb.API.Contexts;
using ChatWeb.Common.CustomExceptions;
using ChatWeb.Domain.AggregatesModel.AccountAggregate;
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

    public async Task<IList<Message>> GetMessages(Guid groupId)
    {
        var messages = await _context.Messages.Where(m =>
            m.GroupId == groupId
        ).ToListAsync();

        return messages;
    }

    public async Task<IList<Group>> GetChatListAsync(Guid userId)
    {
        var groups = await _context.Groups
            .Where(g => g.Participants.Select(p => p.AccountId).Contains(userId))
            .ToListAsync();

        return groups;
    }

    public Task<Message> GetLastMessageAsync(Guid userId, Guid targetId)
    {
        throw new NotImplementedException();
    }

    public async Task<Group> InitiateChatAsync(Guid userId, Guid targetId)
    {
        var group = await _context.Groups.Include(g => g.Participants)
            .FirstOrDefaultAsync(g => g.Participants.Where(p => p.AccountId == userId || p.AccountId == targetId).Count() == 2);

        if (group == null)
        {
            var newGroup = new Group() {
                IsOneOnOne = true
            };

            await _context.Groups.AddAsync(newGroup);
            await _context.GroupParticipants.AddAsync(
                new GroupParticipant()
                {
                    AccountId = userId,
                    AgreedToJoin = true,
                    GroupId = newGroup.Id
                }
            );
            await _context.GroupParticipants.AddAsync(
                new GroupParticipant()
                {
                    AccountId = targetId,
                    AgreedToJoin = false,
                    GroupId = newGroup.Id
                }
            );
            await _context.SaveChangesAsync();

            return newGroup;
        }

        return group;
    }
}
