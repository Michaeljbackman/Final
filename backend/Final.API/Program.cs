using Microsoft.EntityFrameworkCore;
using Final.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<FinalDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("AgencyConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ✅ Middleware ordering
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseRouting();         // ✅ Needed before UseCors + UseAuthorization
app.UseCors("AllowAll");  // ✅ Your CORS policy
app.UseAuthorization();

app.MapControllers();

app.Run();
