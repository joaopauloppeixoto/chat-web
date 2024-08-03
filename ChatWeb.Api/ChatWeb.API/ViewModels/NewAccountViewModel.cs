namespace ChatWeb.API.ViewModels;

public class NewAccountViewModel : CredentialsViewModel
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
}
