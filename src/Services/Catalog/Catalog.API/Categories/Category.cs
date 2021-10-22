using System;
using System.Collections.Generic;
using Ordo.Services.Catalog.API.Data;
using Ordo.Services.Catalog.API.Items;
using Ordo.Services.Catalog.API.Menus;


namespace Ordo.Services.Catalog.API.Categories
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Menu Menu { get; set; }
        public Guid MenuId { get; set; }
        public ICollection<Item> Items { get; set; }

    }
}