using System.Net;

namespace ChatWeb.Common.CustomExceptions;

public class InvalidTokenException : CustomException
{
    public InvalidTokenException() : base("Invalid token.", statusCode: HttpStatusCode.Unauthorized)
    {
        
    }
}
