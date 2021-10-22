using System.ComponentModel.DataAnnotations;

namespace Ordo.Services.Catalog.API.Items
{
    public class CreateItemDto
    {
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        public decimal Price { get; set; }

    }
}