using ChatWeb.API.ViewModels;
using ChatWeb.Domain.AggregatesModel.MessengerAggregate;

namespace ChatWeb.API.Interfaces;

public interface IMessageService
{
    public Task<IList<ChatViewModel>> GetChatListAsync(string userEmail);
    public Task SendAsync(NewMessageViewModel message, Guid guid);
    public Task EditAsync(Guid id, Message message);
    public Task DisableAsync(Guid id);
    public Task<IList<MessageViewModel>> GetMessages(Guid userId, Guid targetId);
}
