namespace QLC.Api.Entities;

public class EntityBase<TKey> where TKey : IEquatable<TKey>
{
    public EntityBase()
    {
    }

    public EntityBase(DateTime updatedAt, DateTime createdAt, DateTime? deletedAt)
    {
        UpdatedAt = updatedAt;
        CreatedAt = createdAt;
        DeletedAt = deletedAt;
    }

    public TKey Id { get; private set; }
    public DateTime UpdatedAt { get; private set; }
    public DateTime CreatedAt { get; private set; }
    public DateTime? DeletedAt { get; private set; }
    
    public void UpdateUpdatedAt() => UpdatedAt = DateTime.Now;
}