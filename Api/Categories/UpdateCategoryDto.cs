using System.ComponentModel.DataAnnotations;

namespace Api.Categories
{
    public class UpdateCategoryDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }

    }
}