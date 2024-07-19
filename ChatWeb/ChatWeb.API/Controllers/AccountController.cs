using ChatWeb.API.Extensions;
using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace ChatWeb.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    public IAccountService _service { get; set; }
    public AccountController(IAccountService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task CreateAccountAsync([FromBody] NewAccountViewModel newAccount)
    {
        var newAccountTest = newAccount.ToDomainModel();
        await _service.RegisterAsync(newAccount);
    }
}
