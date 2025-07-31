namespace QLC.Api.DTOs.Booking;

public record BookingDto(
    string CourtName,
    DateTime StartDate,
    DateTime EndDate);