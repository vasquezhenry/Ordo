using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Restaurants
{
    public class RestaurantRepository : RepositoryBase<Restaurant, AppDbContext>, IRestaurantRepository
    {

        public RestaurantRepository(AppDbContext context) : base(context)
        {
        }

        //<summary>Returns all restaurants by ownerId</summary>
        public async Task<IEnumerable<Restaurant>> GetByOwnerId(string ownerId)
        {
            return await _context.Restaurants.Include(r => r.Menu).Include(r => r.RestaurantAddresses).Where(r => r.OwnerId == ownerId).ToListAsync();
        }

    }
}