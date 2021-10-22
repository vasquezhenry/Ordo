using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Ordo.Services.Catalog.API.RestaurantAddresses;

namespace Ordo.Services.Catalog.API.Restaurants
{
    public class CreateRestaurantDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public IEnumerable<RestaurantAddressDto> Addresses { get; set; }

    }
}