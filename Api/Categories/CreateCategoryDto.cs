using System.ComponentModel.DataAnnotations;

namespace Api.Categories
{
    public class CreateCategoryDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}