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

    public async Task<User?> GetByEmail(string email)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User?> GetById(string id)
    {
        return await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);
    }
}