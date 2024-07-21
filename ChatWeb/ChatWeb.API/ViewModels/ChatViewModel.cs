namespace ChatWeb.API.ViewModels;

public class ChatViewModel
{
    public UserViewModel Interlocutor { get; set; }
    public MessageViewModel LastMessage { get; set; }
}
