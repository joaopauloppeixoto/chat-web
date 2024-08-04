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

    [HttpGet]
    [Authorize]
    public async Task<ActionResult> GetAccountInfoByGuidAsync([FromQuery] string guid)
    {
        var account = await _service.GetAccountInfoAsync(null, Guid.Parse(guid));

        return Ok(account);
    }

    [HttpGet("info")]
    [Authorize]
    public async Task<ActionResult> GetAccountInfoAsync()
    {
        var userId = User.GetUserGuid();
        var account = await _service.GetAccountInfoAsync(null, userId);

        return Ok(account);
    }

    [HttpGet("find")]
    [Authorize]
    public async Task<ActionResult> GetAccountInfoAsync([FromQuery] string q)
    {
        var account = await _service.GetAccountInfoAsync(q);

        return Ok(account);
    }

    [HttpPost]
    public async Task<ActionResult> CreateAccountAsync([FromBody] NewAccountViewModel newAccount)
    {
        await _service.RegisterAsync(newAccount);

        return StatusCode(201);
    }

    [HttpPatch("rename")]
    public async Task<ActionResult> ChangeNameAsync([FromBody] AccountNamesViewModel newAccount)
    {
        var userId = User.GetUserGuid();
        await _service.RenameAccountAsync(userId, newAccount);

        return StatusCode(201);
    }

    [HttpPatch("image")]
    public async Task<ActionResult> UploadAccountImageAsync([FromBody] UploadAccountImageViewModel newImage)
    {
        var userId = User.GetUserGuid();
        await _service.UploadAccountImageAsync(userId, newImage);

        return StatusCode(201);
    }
}
