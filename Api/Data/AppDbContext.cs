using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Api.Categories;
using Api.Menus;
using Api.Restaurants;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<RestaurantAddress> RestaurantAddresses { get; set; }
        public AppDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Restaurant>().HasMany(r => r.RestaurantAddresses).WithOne(a => a.Restaurant).OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Restaurant>().HasOne(r => r.Menu).WithOne(m => m.Restaurant).HasForeignKey<Menu>(m => m.RestaurantId);
            modelBuilder.Entity<Menu>().HasMany(m => m.Categories).WithOne(c => c.Menu).HasForeignKey(c => c.MenuId);
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {
            var AddedEntities = ChangeTracker.Entries().Where(E => E.State == EntityState.Added).ToList();

            AddedEntities.ForEach(E =>
            {
                if (E.Entity is BaseEntity)
                {
                    E.Property("CreatedDate").CurrentValue = DateTime.Now;
                }
            });

            var EditedEntities = ChangeTracker.Entries().Where(E => E.State == EntityState.Modified).ToList();

            EditedEntities.ForEach(E =>
            {
                if (E.Entity is BaseEntity)
                {

                    E.Property("UpdatedDate").CurrentValue = DateTime.Now;
                }
            });

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }


    }
}