using System.Net;

namespace ChatWeb.Common.CustomExceptions;

public class InvalidLoginOrPasswordException : CustomException
{
    public InvalidLoginOrPasswordException() : base("Invalid login or password.", statusCode: HttpStatusCode.Unauthorized)
    {

    }
}
