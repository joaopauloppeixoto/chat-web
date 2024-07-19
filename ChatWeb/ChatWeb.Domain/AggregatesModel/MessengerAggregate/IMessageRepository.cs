namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public interface IMessageRepository
{
    public Task Add(Message message);
    public Task Update(Guid Id, Message message);
    public Task Delete(Guid id);
}
