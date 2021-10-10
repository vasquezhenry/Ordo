using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data;

namespace Api.Items
{
    public interface IItemRepository : IRepositoryBase<Item>
    {
        Task<IEnumerable<Item>> GetByCategoryId(Guid categoryId);
    }
}