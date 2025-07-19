namespace QLC.Api.Entities;

public class Feedback : EntityBase<long>
{
    public Feedback()
    {
    }

    public Feedback(
        User user,
        Court court,
        string comment,
        DateTime createdAt,
        DateTime updatedAt,
        DateTime? deletedAt) : base(createdAt, updatedAt, deletedAt)
    {
        Court = court;
        Comment = comment;
        User = user;
    }

    public User User { get; private set; }
    public Court Court { get; private set; }
    public string Comment { get; private set; }
}