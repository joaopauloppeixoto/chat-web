namespace ChatWeb.API.ViewModels;

public class NewAccountViewModel
{
    public string Email { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Password { get; set; }
}
