using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Items
{
    public interface IItemRepository : IRepositoryBase<Item>
    {
        Task<IEnumerable<Item>> GetByCategoryId(Guid categoryId);
    }
}