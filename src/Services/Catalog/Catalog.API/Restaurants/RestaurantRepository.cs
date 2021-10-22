using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Restaurants
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