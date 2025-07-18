using QLC.Api.Entities;

namespace QLC.Api.Repositories.Abstractions;

public interface IUserRepository
{
    public Task<List<User>> GetAllUsers();
    public Task<User?> GetByEmail(string email);
    public Task<User?> GetById(string id);
}