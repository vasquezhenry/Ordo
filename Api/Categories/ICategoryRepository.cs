using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data;

namespace Api.Categories
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        Task<IEnumerable<Category>> GetByMenuId(Guid menuId);
    }
}