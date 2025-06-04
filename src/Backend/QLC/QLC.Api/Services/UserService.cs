using QLC.Api.Entities;
using QLC.Api.Repositories.Abstractions;
using QLC.Api.Services.Abstractions;

namespace QLC.Api.Services;

public class UserService(IUserRepository userRepository) : IUserService
{
    private readonly IUserRepository _userRepository = userRepository;
    
    public Task<List<User>> GetAllUsers()
    {
        return _userRepository.GetAllUsers();
    }
}