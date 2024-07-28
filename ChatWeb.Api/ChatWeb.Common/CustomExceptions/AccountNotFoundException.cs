using System.Net;

namespace ChatWeb.Common.CustomExceptions;

public class AccountNotFoundException : CustomException
{
    public AccountNotFoundException(Exception? innerException = null) : base("Account not found.", innerException, HttpStatusCode.BadRequest)
    {
    }
}
