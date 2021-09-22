using System.Collections.Generic;
using Api.Data;
using Api.Menus;

namespace Api.Restaurants
{
    public class Restaurant : BaseEntity
    {
        public string Name { get; set; }
        public string Type { get; set; }
        public string OwnerId { get; set; }
        public string Description { get; set; }
        public Menu Menu { get; set; }
        public ICollection<RestaurantAddress> RestaurantAddresses { get; set; }
    }
}