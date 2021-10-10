using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data;

namespace Api.Menus
{
    public interface IMenuRepository : IRepositoryBase<Menu>
    {
        Task<IEnumerable<Menu>> GetByRestaurantId(Guid restaurantId);
    }
}