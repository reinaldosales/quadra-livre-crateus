using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QLC.Api.Entities;

namespace QLC.Api.ContextMappers;

public class CourtMap : IEntityTypeConfiguration<Court>
{
    public void Configure(EntityTypeBuilder<Court> builder)
    {
        builder.HasKey(f => f.Id);

        builder
            .Property(c => c.Type)
            .HasConversion<string>();
    }
}