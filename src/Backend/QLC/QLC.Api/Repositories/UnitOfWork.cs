using QLC.Api.Context;
using QLC.Api.Repositories.Abstractions;

namespace QLC.Api.Repositories;

public class UnitOfWork(ApplicationDbContext context) : IUnitOfWork
{
    ApplicationDbContext _context = context;
    
    public async Task CommitAsync()
    {
        await _context.SaveChangesAsync();
    }
}