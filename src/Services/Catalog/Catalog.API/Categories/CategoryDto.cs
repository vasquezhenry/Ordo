using System;
using System.Collections.Generic;
using Ordo.Services.Catalog.API.Items;

namespace Ordo.Services.Catalog.API.Categories
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid MenuId { get; set; }

        public IEnumerable<ItemDto> Items { get; set; }

    }
}