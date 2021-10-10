using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Menus
{
    public class MenuRepository : RepositoryBase<Menu, AppDbContext>, IMenuRepository
    {

        public MenuRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Menu>> GetByRestaurantId(Guid restaurantId)
        {
            return await _context.Menus.Include(m => m.Categories).Where(m => m.RestaurantId == restaurantId).ToListAsync();
        }
    }
}