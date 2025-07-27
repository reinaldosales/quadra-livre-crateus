namespace QLC.Api.DTOs.Court;

public record CourtDto(
    long Id,
    string Name,
    string Address,
    string Type,
    bool IsAvailable);