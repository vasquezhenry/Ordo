using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Ordo.Services.Catalog.API.Data
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<IEnumerable<T>> GetAll();
        Task<T> Get(Guid id);
        Task<T> Create(T entity);
        Task<T> Update(T entity);
        Task<T> Delete(Guid id);
    }
}