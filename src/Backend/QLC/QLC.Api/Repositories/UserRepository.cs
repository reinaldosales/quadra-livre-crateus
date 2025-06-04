using Microsoft.EntityFrameworkCore;
using QLC.Api.Context;
using QLC.Api.Entities;
using QLC.Api.Repositories.Abstractions;

namespace QLC.Api.Repositories;

public class UserRepository(ApplicationDbContext context) : IUserRepository
{
    ApplicationDbContext _context = context;

    public Task<List<User>> GetAllUsers()
    {
        return _context.Users.AsNoTracking().ToListAsync();
    }
}