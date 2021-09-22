using System.ComponentModel.DataAnnotations;
using Api.RestaurantAddresses;
using System.Collections.Generic;

namespace Api.Restaurants
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