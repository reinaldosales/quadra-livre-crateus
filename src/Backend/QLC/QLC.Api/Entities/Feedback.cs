namespace QLC.Api.Entities;

public class Feedback : EntityBase<long>
{
    public User User { get; private set; }
    public Court Court { get; private set; }
    public string Description { get; private set; }
}