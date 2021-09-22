using Api.Menus;
using Api.Restaurants;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<RestaurantAddress> RestaurantAddresses { get; set; }
        public AppDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurant>().HasMany(r => r.RestaurantAddresses).WithOne(a => a.Restaurant).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Restaurant>().HasOne(r => r.Menu).WithOne(m => m.Restaurant).HasForeignKey<Menu>(m => m.RestaurantId);
        }


    }
}