using System;
using System.ComponentModel.DataAnnotations;

namespace Api.Items
{
    public class UpdateItemDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public bool Active { get; set; }
        [Required]
        public Guid CategoryId { get; set; }
    }
}