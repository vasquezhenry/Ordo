using System;
using Api.Data;
using Api.Restaurants;
using System.Collections.Generic;
using Api.Categories;

namespace Api.Menus
{
    public class Menu : BaseEntity
    {
        public string Description { get; set; }
        public Restaurant Restaurant { get; set; }
        public Guid RestaurantId { get; set; }
        public ICollection<Category> Categories { get; set; }
    }
}