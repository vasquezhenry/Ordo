using System;
using Ordo.Services.Catalog.API.Data;
using Ordo.Services.Catalog.API.Restaurants;

namespace Ordo.Services.Catalog.API.RestaurantAddresses
{
    public class RestaurantAddress : BaseAddressEntity
    {
        public Restaurant Restaurant { get; set; }
        public Guid RestaurantId { get; set; }
    }
}