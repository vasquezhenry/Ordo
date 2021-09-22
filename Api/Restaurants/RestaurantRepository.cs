using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Restaurants
{
    public class RestaurantRepository
    {
        private AppDbContext _context;

        public RestaurantRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateRestaurant(Restaurant r)
        {
            _context.Restaurants.Add(r);
            await _context.SaveChangesAsync();
        }

        //<summary>Returns all restaurants by ownerId</summary>
        public async Task<IEnumerable<Restaurant>> GetRestaurants(string ownerId)
        {
            return await _context.Restaurants.Include(r => r.Menu).Include(r => r.RestaurantAddresses).Where(r => r.OwnerId == ownerId).ToListAsync();
        }

    }
}