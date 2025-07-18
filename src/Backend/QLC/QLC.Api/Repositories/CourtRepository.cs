using Microsoft.EntityFrameworkCore;
using QLC.Api.Context;
using QLC.Api.Entities;
using QLC.Api.Repositories.Abstractions;

namespace QLC.Api.Repositories;

public class CourtRepository(ApplicationDbContext context) : ICourtRepository
{
    ApplicationDbContext _context = context;
    
    public async Task Insert(Court court)
    {
        await _context.Courts.AddAsync(court);
    }

    public async Task<IEnumerable<Court>> GetAll()
    {
        return await _context.Courts
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Court?> GetById(long id)
    {
        return await _context.Courts
            .AsNoTracking()
            .FirstOrDefaultAsync(c => c.Id == id);
    }
}