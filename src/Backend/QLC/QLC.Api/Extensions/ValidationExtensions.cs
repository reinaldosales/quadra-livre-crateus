using System.ComponentModel.DataAnnotations;

namespace QLC.Api.Extensions;

public static class ValidationExtensions
{
    public static IResult Validate<T>(this T model)
    {
        var results = new List<ValidationResult>();
        var context = new ValidationContext(model);

        if (!Validator.TryValidateObject(model, context, results, true))
        {
            var errors = results
                .GroupBy(e => e.MemberNames.FirstOrDefault() ?? "")
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(e => e.ErrorMessage!).ToArray());

            return Results.ValidationProblem(errors);
        }

        return null!;
    }
}