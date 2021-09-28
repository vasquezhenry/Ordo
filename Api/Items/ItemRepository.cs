using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Items
{
    public class ItemRepository
    {
        private readonly AppDbContext _context;

        public ItemRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateItem(Item item)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateItem(Guid itemId, Item item)
        {
            var i = await _context.Items.FindAsync(itemId);
            i.Description = item.Description;
            i.Price = item.Price;
            i.Active = item.Active;
            i.CategoryId = item.CategoryId;
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Item>> GetItems(Guid categoryId)
        {
            return await _context.Items.Where(i => i.CategoryId == categoryId).ToListAsync();
        }

        public async Task<Item> GetItem(Guid id)
        {
            return await _context.Items.Where(i => i.Id == id).SingleOrDefaultAsync();
        }

        public async Task DeleteItem(Guid id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(i => i.Id == id);
            _context.Items.Remove(item);
            await _context.SaveChangesAsync();
        }
    }
}