using QLC.Api.Exceptions;

namespace QLC.Api.Entities;

public class Booking : EntityBase<long>
{
    public Booking()
    {
    }

    public Booking(
        string userId,
        long courtId,
        DateTime startDate,
        DateTime endDate,
        BookingStatus status,
        DateTime createdAt,
        DateTime updatedAt,
        DateTime? deletedAt) : base(createdAt, updatedAt, deletedAt)
    {
        UserId = userId;
        CourtId = courtId;
        Status = status;
        StartDate = startDate;
        EndDate = endDate;
        
        if(startDate > endDate)
            throw new CreateBookingException("Invalid date range");
        
        if(startDate.Subtract(endDate).Hours > 2)
            throw new CreateBookingException("Hours exceeds 2 hours");
    }

    public string UserId { get; private set; }
    public long CourtId { get; private set; }
    public DateTime StartDate { get; private set; }
    public DateTime EndDate { get; private set; }
    public BookingStatus Status { get; private set; }
}