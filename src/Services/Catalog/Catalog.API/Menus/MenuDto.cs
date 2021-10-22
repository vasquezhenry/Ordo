using System;
using System.Collections.Generic;
using Ordo.Services.Catalog.API.Categories;

namespace Ordo.Services.Catalog.API.Menus
{
    public class MenuDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Guid RestaurantId { get; set; }

        public IEnumerable<CategoryDto> Categories { get; set; }
    }
}