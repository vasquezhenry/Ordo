using System;
using System.Collections.Generic;
using Api.Data;
using Api.Items;
using Api.Menus;

namespace Api.Categories
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