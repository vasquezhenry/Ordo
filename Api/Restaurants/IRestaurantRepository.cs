using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data;

namespace Api.Restaurants
{
    public interface IRestaurantRepository : IRepositoryBase<Restaurant>
    {
        Task<IEnumerable<Restaurant>> GetByOwnerId(string ownerId);
    }
}