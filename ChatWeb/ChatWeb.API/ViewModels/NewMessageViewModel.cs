namespace ChatWeb.API.ViewModels;

public class NewMessageViewModel
{
    public Guid ReceiverId { get; set; }
    public string Content { get; set; }
}
