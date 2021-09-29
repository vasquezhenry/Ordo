using System;
using System.Collections.Generic;
using Api.Categories;

namespace Api.Menus
{
    public class MenuDto
    {
        public string Description { get; set; }
        public Guid RestaurantId { get; set; }

        public IEnumerable<CategoryDto> Categories { get; set; }
    }
}