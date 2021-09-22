using System;
using Api.Data;
using Api.Menus;

namespace Api.Categories
{
    public class Category : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public Menu Menu { get; set; }
        public Guid MenuId { get; set; }

    }
}