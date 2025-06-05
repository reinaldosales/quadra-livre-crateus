using QLC.Api.Context;
using QLC.Api.Entities;
using QLC.Api.IoC;
using QLC.Api.Services.Abstractions;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddInfraestructure(builder.Configuration);
builder.Services.AddRepositoryIoc();
builder.Services.AddServicesIoC();

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                    "http://localhost:5173",
                    "https://localhost:5173"
                )
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.MapIdentityApi<User>();

app.MapOpenApi();
app.MapScalarApiReference();

app.UseHttpsRedirection();

app.Run();