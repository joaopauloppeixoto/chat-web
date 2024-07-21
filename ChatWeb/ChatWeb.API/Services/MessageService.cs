using ChatWeb.API.Extensions;
using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;
using System.Text.RegularExpressions;

namespace ChatWeb.API.Services;

public class MessageService : IMessageService
{
    public IMessageRepository _repository { get; set; }
    public MessageService(IMessageRepository repository)
    {
        _repository = repository;
    }

    public Task DisableAsync(Guid id)
    {
        throw new NotImplementedException();
    }

    public Task EditAsync(Guid id, Message message)
    {
        throw new NotImplementedException();
    }

    public async Task<IList<GroupViewModel>> GetChatListAsync(Guid userId)
    {
        return (await _repository.GetChatListAsync(userId))
            .Select(g => g.ToViewModel())
            .ToList();
    }

    public async Task SendAsync(NewMessageViewModel message, Guid senderId)
    {
        await _repository.AddAsync(
            message.ToDomainModel(senderId)
        );
    }

    public async Task<IList<MessageViewModel>> GetMessages(Guid groupId)
    {
        return (await _repository.GetMessages(groupId))
            .Select(m => m.ToViewModel())
            .ToList();
    }

    public async Task<GroupViewModel> InitiateChatAsync(Guid userId, Guid targetId)
    {
        var group = await _repository.InitiateChatAsync(userId, targetId);

        return group.ToViewModel();
    }
}
