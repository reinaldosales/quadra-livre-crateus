using Microsoft.AspNetCore.Identity;

namespace QLC.Api.Entities;

public class User : IdentityUser
{
    public bool IsAdmin { get; private set; }
}