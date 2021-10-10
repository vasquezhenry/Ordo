using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Items
{
    public class ItemRepository : RepositoryBase<Item, AppDbContext>
    {

        public ItemRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Item>> GetByCategoryId(Guid categoryId)
        {
            return await _context.Items.Where(i => i.CategoryId == categoryId).ToListAsync();
        }

    }
}