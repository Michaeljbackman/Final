using Microsoft.EntityFrameworkCore;

namespace WaterProject.API.Data;

public class WaterDbContext : DbContext
{
    public WaterDbContext(DbContextOptions<WaterDbContext> options) : base(options)
    {
    }
    
    public DbSet<Entertainer> Projects { get; set; }
}