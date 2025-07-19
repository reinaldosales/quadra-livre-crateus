namespace QLC.Api.DTOs.Court;

public record CourtDto(
    long Id,
    string Name,
    string Address,
    CourtType Type,
    bool IsAvailable);