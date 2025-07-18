namespace QLC.Api.DTOs.Booking;

public record CreateBookingDto(string UserId, long CourtId, DateTime ReserveDate);