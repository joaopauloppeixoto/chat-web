namespace ChatWeb.Domain.AggregatesModel.MessengerAggregate;

public interface IMessageRepository
{
    public void Add(Message message);
    public void Update(Guid Id, Message message);
    public void Delete(Guid id);
}
