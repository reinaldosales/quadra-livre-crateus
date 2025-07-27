using QLC.Api.Entities;

namespace QLC.Api.Repositories.Abstractions;

public interface IBookingRepository
{
    public Task Save(Booking booking);
    public Task<IEnumerable<Booking>> GetAll();
    public Task<Booking?> GetByUserAndCourt(string userId, long courtId, BookingStatus status);
    public Task<IEnumerable<Booking>> GetBookingsByCourtIdAndDate(long courtId, DateTime date);
}