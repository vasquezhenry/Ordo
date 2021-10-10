using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Api.RestaurantAddresses;

namespace Api.Restaurants
{
    public class UpdateRestaurantDto
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