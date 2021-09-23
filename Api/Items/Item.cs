using System;
using Api.Categories;
using Api.Data;

namespace Api.Items
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