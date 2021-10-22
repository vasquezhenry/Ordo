using System;
using Ordo.Services.Catalog.API.Categories;
using Ordo.Services.Catalog.API.Data;

namespace Ordo.Services.Catalog.API.Items
{
    public class Item : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool? Active { get; set; }
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
    }
}