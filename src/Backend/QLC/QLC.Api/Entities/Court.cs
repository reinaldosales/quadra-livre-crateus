using System.Runtime.CompilerServices;

namespace QLC.Api.Entities;

public class Court : EntityBase<long>
{
    public Court()
    {
    }

    public Court(
        string name,
        string address,
        CourtType type,
        bool isAvailable,
        DateTime createdAt,
        DateTime updatedAt,
        DateTime? deletedAt) : base(createdAt, updatedAt, deletedAt)
    {
        Name = name;
        Address = address;
        Type = type;
        IsAvailable = isAvailable;
    }

    public string Name { get; private set; }
    public string Address { get; private set; }
    public CourtType Type { get; private set; }
    public bool IsAvailable { get; private set; }

    public void SetAsUnavailable() => IsAvailable = false;

    public void SetAsAvailable() => IsAvailable = true;
}