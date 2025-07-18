using Microsoft.EntityFrameworkCore;
using QLC.Api.Context;
using QLC.Api.Entities;
using QLC.Api.Repositories.Abstractions;

namespace QLC.Api.Repositories;

public class FeedbackRepository(ApplicationDbContext context) : IFeedbackRepository
{
    ApplicationDbContext _context = context;
    
    public async Task Save(Feedback feedback)
    {
        await _context.Feedbacks.AddAsync(feedback);
    }

    public async Task<IEnumerable<Feedback>> GetAll()
    {
        return await _context.Feedbacks
            .AsNoTracking()
            .ToListAsync();
    }
}