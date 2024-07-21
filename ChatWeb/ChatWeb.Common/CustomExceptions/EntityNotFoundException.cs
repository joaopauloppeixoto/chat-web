namespace ChatWeb.Common.CustomExceptions;

public class EntityNotFoundException : CustomException
{
    public EntityNotFoundException(string message) : base(message)
    {
        
    }
}
