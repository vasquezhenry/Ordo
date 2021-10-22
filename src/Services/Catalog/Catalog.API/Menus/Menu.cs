using System;
using System.Collections.Generic;
using Ordo.Services.Catalog.API.Categories;
using Ordo.Services.Catalog.API.Data;
using Ordo.Services.Catalog.API.Restaurants;

namespace Ordo.Services.Catalog.API.Menus
{
    public class Menu : BaseEntity
    {
        public string Description { get; set; }
        public Restaurant Restaurant { get; set; }
        public Guid RestaurantId { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}