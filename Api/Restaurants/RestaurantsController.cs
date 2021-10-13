using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Menus;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Restaurants
{
    // [Authorize]
    [ApiController]
    [Route("restaurants")]
    public class RestaurantsController : ControllerBase
    {

        private readonly IRestaurantRepository _restaurantRepository;
        private readonly IMapper _mapper;

        public RestaurantsController(IRestaurantRepository repository, IMapper mapper)
        {
            _restaurantRepository = repository;
            _mapper = mapper;
        }

        ///<summary>
        ///Creates restaurant
        ///</summary>
        [HttpPost("/owners/{ownerId}/restaurants")]
        public async Task<ActionResult> CreateRestaurant(string ownerId, CreateRestaurantDto restaurantDto)
        {
            var restaurant = _mapper.Map<Restaurant>(restaurantDto);
            restaurant.OwnerId = ownerId;
            restaurant.Menu = new Menu
            {
                Restaurant = restaurant
            };
            await _restaurantRepository.Create(restaurant);
            return CreatedAtAction(nameof(GetRestaurants), new { ownerId = restaurant.OwnerId }, _mapper.Map<RestaurantDto>(restaurant));
        }

        ///<summary>
        ///Gets restaurants by owner id(firebase user id)
        ///</summary>
        [HttpGet("/owners/{ownerId}/restaurants")]
        public async Task<ActionResult<IEnumerable<RestaurantDto>>> GetRestaurants(string ownerId)
        {
            var restaurants = await _restaurantRepository.GetByOwnerId(ownerId);
            return Ok(_mapper.Map<IEnumerable<Restaurant>, IEnumerable<RestaurantDto>>(restaurants));
        }

        /// <summary>Update restaurant by id</summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<RestaurantDto>> UpdateRestaurant(Guid id, UpdateRestaurantDto restaurantDto)
        {
            var restaurant = await _restaurantRepository.Get(id);
            if (restaurant == null)
            {
                return BadRequest("Restaurant does not exists");
            }
            restaurant.Name = restaurantDto.Name;
            restaurant.Type = restaurantDto.Type;
            restaurant.Description = restaurantDto.Description;
            restaurant.RestaurantAddresses = _mapper.Map<ICollection<RestaurantAddress>>(restaurantDto.Addresses);
            await _restaurantRepository.Update(restaurant);
            return Ok(_mapper.Map<RestaurantDto>(restaurant));
        }
    }
}