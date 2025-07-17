using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QLC.Api.Entities;

namespace QLC.Api.ContextMappers;

public class UserMap : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder
            .Property(x => x.IsAdmin)
            .HasDefaultValue(false);
    }
}