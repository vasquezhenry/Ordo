using System;

namespace Api.Items
{
    public class ItemDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public bool? Active { get; set; }
        public Guid CategoryId { get; set; }
    }
}