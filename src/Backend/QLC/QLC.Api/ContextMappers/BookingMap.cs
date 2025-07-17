using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using QLC.Api.Entities;

namespace QLC.Api.ContextMappers;

public class BookingMap : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.HasKey(f => f.Id);
        
        builder
            .Property(c => c.Status)
            .HasConversion<string>();
    }
}