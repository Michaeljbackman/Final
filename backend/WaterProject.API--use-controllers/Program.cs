using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<WaterDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("WaterConnection")));

// ✅ Configure CORS properly
builder.Services.AddCors(options => 
    options.AddPolicy("AllowReactAppBlah", policy =>
    {
        policy.WithOrigins(
            "http://localhost:3000",
            "https://calm-sky-0e6a9bc1e.6.azurestaticapps.net"
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    }));

var app = builder.Build();

// ✅ CORS middleware must be before MapControllers()
app.UseCors("AllowReactAppBlah");

// Swagger for development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
