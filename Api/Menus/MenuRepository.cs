using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Menus
{
    public class MenuRepository
    {
        private readonly AppDbContext _context;

        public MenuRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Menu>> GetMenus(Guid restaurantId)
        {
            return await _context.Menus.Include(m => m.Categories).Where(m => m.RestaurantId == restaurantId).ToListAsync();
        }
    }
}