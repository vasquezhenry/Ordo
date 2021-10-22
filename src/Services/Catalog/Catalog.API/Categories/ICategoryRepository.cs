using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Categories
{
    public interface ICategoryRepository : IRepositoryBase<Category>
    {
        Task<IEnumerable<Category>> GetByMenuId(Guid menuId);
    }
}