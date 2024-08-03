using ChatWeb.API.Extensions;
using ChatWeb.API.Interfaces;
using ChatWeb.API.ViewModels;
using Microsoft.AspNetCore.Authorization;
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

    [HttpGet("info")]
    [Authorize]
    public async Task<ActionResult> GetAccountInfoAsync()
    {
        var guid = User.GetUserGuid();
        var account = await _service.GetAccountInfoAsync(guid: guid);

        return Ok(account);
    }

    [HttpGet("find")]
    [Authorize]
    public async Task<ActionResult> GetAccountInfoAsync([FromQuery] string? email, [FromQuery] string? guid)
    {
        var account = await _service.GetAccountInfoAsync(email, guid != null ? Guid.Parse(guid) : null);

        return Ok(account);
    }

    [HttpPost]
    public async Task<ActionResult> CreateAccountAsync([FromBody] NewAccountViewModel newAccount)
    {
        await _service.RegisterAsync(newAccount);

        return StatusCode(201);
    }
}
