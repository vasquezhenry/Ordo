using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Categories
{
    public class CategoryRepository : RepositoryBase<Category, AppDbContext>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }


        public async Task<IEnumerable<Category>> GetByMenuId(Guid menuId)
        {
            return await _context.Categories.Include(c => c.Items).Where(c => c.MenuId == menuId).ToListAsync();
        }
    }
}