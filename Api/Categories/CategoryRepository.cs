using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Microsoft.EntityFrameworkCore;

namespace Api.Categories
{
    public class CategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateCategory(Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Category>> GetCategories(Guid menuId)
        {
            return await _context.Categories.Where(c => c.MenuId == menuId).ToListAsync();
        }

        public async Task<Category> GetCategory(Guid id)
        {
            return await _context.Categories.Where(c => c.Id == id).SingleOrDefaultAsync();
        }

        public async Task UpdateCategory(Guid categoryId, UpdateCategoryDto categoryDto)
        {

        }
    }
}