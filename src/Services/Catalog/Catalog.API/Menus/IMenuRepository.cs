using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Menus
{
    public interface IMenuRepository : IRepositoryBase<Menu>
    {
        Task<IEnumerable<Menu>> GetByRestaurantId(Guid restaurantId);
    }
}