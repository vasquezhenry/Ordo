using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Ordo.Services.Catalog.API.RestaurantAddresses;

namespace Ordo.Services.Catalog.API.Restaurants
{
    public class RestaurantDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string OwnerId { get; set; }
        public string Description { get; set; }
        public Guid MenuId { get; set; }
        public IEnumerable<RestaurantAddressDto> Addresses { get; set; }
    }
}