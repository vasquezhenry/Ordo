using System.Collections.Generic;
using Ordo.Services.Catalog.API.Data;
using Ordo.Services.Catalog.API.Menus;
using Ordo.Services.Catalog.API.RestaurantAddresses;

namespace Ordo.Services.Catalog.API.Restaurants
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