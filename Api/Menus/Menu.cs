using System;
using Api.Data;
using Api.Restaurants;

namespace Api.Menus
{
    public class Menu : BaseEntity
    {
        public string Description;
        public Restaurant Restaurant;
        public Guid RestaurantId;
    }
}