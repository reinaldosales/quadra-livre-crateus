using Microsoft.EntityFrameworkCore;
using QLC.Api.Context;
using QLC.Api.Entities;
using QLC.Api.Repositories.Abstractions;

namespace QLC.Api.Repositories;

public class BookingRepository(ApplicationDbContext context) : IBookingRepository
{
    ApplicationDbContext _context = context;
    
    public async Task Save(Booking booking)
    {
        await _context.Bookings.AddAsync(booking);
    }

    public async Task<IEnumerable<Booking>> GetAll()
    {
        return await _context.Bookings
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<Booking?> GetByUserAndCourt(string userId, long courtId, BookingStatus status)
    {
        return await _context.Bookings
            .AsNoTracking()
            .FirstOrDefaultAsync(x => x.UserId == userId && x.CourtId == courtId && x.Status == status);
    }
}