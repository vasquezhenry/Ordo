using System.ComponentModel.DataAnnotations;

namespace Ordo.Services.Catalog.API.Categories
{
    public class UpdateCategoryDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}