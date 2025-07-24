namespace QLC.Api.Entities;

public class Feedback : EntityBase<long>
{
    public Feedback()
    {
    }

    public Feedback(
        string userId,
        long courtId,
        string comment,
        DateTime createdAt,
        DateTime updatedAt,
        DateTime? deletedAt) : base(createdAt, updatedAt, deletedAt)
    {
        CourtId = courtId;
        Comment = comment;
        UserId = userId;
    }

    public string UserId { get; private set; }
    public long CourtId { get; private set; }
    public string Comment { get; private set; }
}