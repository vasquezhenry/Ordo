using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Menus
{
    [ApiController]
    public class MenusController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly MenuRepository _menuRepository;

        public MenusController(IMapper mapper, MenuRepository repository)
        {
            _mapper = mapper;
            _menuRepository = repository;
        }

        [HttpGet("restaurants/{restaurantId}/menus")]
        public async Task<ActionResult<IEnumerable<MenuDto>>> GetMenus(Guid restaurantId)
        {
            var menus = await _menuRepository.GetByRestaurantId(restaurantId);
            return Ok(_mapper.Map<IEnumerable<MenuDto>>(menus));
        }
    }
}