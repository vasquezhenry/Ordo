using System.ComponentModel.DataAnnotations;

namespace Ordo.Services.Catalog.API.Categories
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}