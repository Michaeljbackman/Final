using Microsoft.EntityFrameworkCore;
using Final.API.Data; // ⬅️ updated namespace

var builder = WebApplication.CreateBuilder(args);

// ✅ Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Update context + connection string
builder.Services.AddDbContext<FinalDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("AgencyConnection")));

builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowReactAppBlah", policy =>
        {
            policy.WithOrigins(
                "http://localhost:3000",
                "https://localhost:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
    });


var app = builder.Build();

app.UseCors("AllowReactAppBlah");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();