using QLC.Api.Exceptions;

namespace QLC.Api.Entities;

public class Booking : EntityBase<long>
{
    public Booking()
    {
    }

    public Booking(
        User user,
        Court court,
        DateTime startDate,
        DateTime endDate,
        BookingStatus status,
        DateTime createdAt,
        DateTime updatedAt,
        DateTime? deletedAt) : base(createdAt, updatedAt, deletedAt)
    {
        User = user;
        Status = status;
        StartDate = startDate;
        EndDate = endDate;
        
        if(startDate > endDate || startDate < DateTime.Now || endDate < DateTime.Now)
            throw new CreateBookingException("Invalid date range");
        
        if(startDate.Subtract(endDate).Hours > 2)
            throw new CreateBookingException("Hours exceeds 2 hours");
    }

    public User User { get; private set; }
    public Court Court { get; private set; }
    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public BookingStatus Status { get; private set; }
}