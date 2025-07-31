using QLC.Api.DTOs.Booking;

namespace QLC.Api.Services.Abstractions;

public interface IBookingService
{
    public Task CreateBooking(CreateBookingDto bookingDto);
    public Task<IEnumerable<BookingDto>> GetAll();
    public Task<IEnumerable<BookingDto>> GetAllByUserId(string userId);
}