using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Restaurants
{
    // [Authorize]
    [ApiController]
    [Route("/api/restaurants")]
    public class RestaurantsController : ControllerBase
    {

        private readonly RestaurantRepository _repository;
        private readonly IMapper _mapper;

        public RestaurantsController(RestaurantRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("/api/owners/{ownerId}/restaurants")]
        public async Task<ActionResult> CreateRestaurant(string ownerId, CreateRestaurantDto restaurantDto)
        {
            var restaurant = _mapper.Map<Restaurant>(restaurantDto);
            restaurant.OwnerId = ownerId;
            await _repository.CreateRestaurant(restaurant);
            return CreatedAtAction(nameof(GetRestaurants), new { ownerId = restaurant.OwnerId }, restaurant);
        }

        [HttpGet("/api/owners/{ownerId}/restaurants")]
        public async Task<ActionResult<IEnumerable<RestaurantDto>>> GetRestaurants(string ownerId)
        {
            var restaurants = await _repository.GetRestaurants(ownerId);
            var restaurantDtos = _mapper.Map<IEnumerable<Restaurant>, IEnumerable<RestaurantDto>>(restaurants);
            return Ok(restaurantDtos);
        }
    }
}