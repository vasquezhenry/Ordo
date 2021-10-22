using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Items
{
    public class ItemRepository : RepositoryBase<Item, AppDbContext>, IItemRepository
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