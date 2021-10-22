using System.ComponentModel.DataAnnotations;

namespace Ordo.Services.Catalog.API.RestaurantAddresses
{
    public class RestaurantAddressDto
    {
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public string Address4 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string Country { get; set; }
        [Required]
        public string PostalCode { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}