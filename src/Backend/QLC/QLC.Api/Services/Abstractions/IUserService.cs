using QLC.Api.Entities;

namespace QLC.Api.Services.Abstractions;

public interface IUserService
{
    public Task<List<User>> GetAllUsers();
}