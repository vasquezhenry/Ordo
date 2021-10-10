using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Categories
{
    public class CategoryRepository : RepositoryBase<Category, AppDbContext>
    {
        public CategoryRepository(AppDbContext context) : base(context)
        {
        }


        public async Task<IEnumerable<Category>> GetByMenuId(Guid menuId)
        {
            return await _context.Categories.Where(c => c.MenuId == menuId).ToListAsync();
        }
    }
}