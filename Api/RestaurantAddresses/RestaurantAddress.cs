using System;
using Api.Data;

namespace Api.Restaurants
{
    public class RestaurantAddress : BaseAddressEntity
    {
        public Restaurant Restaurant { get; set; }
        public Guid RestaurantId { get; set; }
    }
}