namespace QLC.Api.DTOs.Booking;

public record CreateFeedbackDto(
    string UserId,
    long CourtId,
    string Comment);