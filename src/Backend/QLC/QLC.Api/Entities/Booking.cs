namespace QLC.Api.Entities;

public class Booking : EntityBase<long>
{
    public Booking() { }

    public Booking(
        User user,
        Court court,
        DateTime reserveDate,
        BookingStatus status,
        DateTime createdAt,
        DateTime updatedAt,
        DateTime? deletedAt) : base(createdAt, updatedAt, deletedAt)
    {
        User = user;
        Status = status;
        ReserveDate = reserveDate;
    }
    
    public User User { get; private set; }
    public Court Court { get; private set; }
    public DateTime ReserveDate { get; private set; }
    public BookingStatus Status { get; private set; }
}