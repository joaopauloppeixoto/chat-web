using System.Net;

namespace ChatWeb.Common.CustomExceptions;

public class EntityNotFoundException : CustomException
{
    public EntityNotFoundException(string message) : base(message, statusCode: HttpStatusCode.NotFound)
    {

    }
}
