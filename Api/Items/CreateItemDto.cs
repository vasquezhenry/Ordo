using System.ComponentModel.DataAnnotations;

namespace Api.Items
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