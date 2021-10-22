using System.Collections.Generic;
using System.Threading.Tasks;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Restaurants
{
    public interface IRestaurantRepository : IRepositoryBase<Restaurant>
    {
        Task<IEnumerable<Restaurant>> GetByOwnerId(string ownerId);
    }
}