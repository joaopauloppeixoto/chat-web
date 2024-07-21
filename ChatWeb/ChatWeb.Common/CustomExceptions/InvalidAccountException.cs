using System.Net;

namespace ChatWeb.Common.CustomExceptions;

public class InvalidAccountException : CustomException
{
    public InvalidAccountException() : base("This account doesn't exists in our database.", statusCode: HttpStatusCode.NotFound)
    {
        
    }
}
