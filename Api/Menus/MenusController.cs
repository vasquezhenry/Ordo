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
        private readonly MenuRepository _repository;

        public MenusController(IMapper mapper, MenuRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet("restaurants/{restaurantId}/menus")]
        public async Task<ActionResult<IEnumerable<MenuDto>>> GetMenus(Guid restaurantId)
        {
            var menus = await _repository.GetMenus(restaurantId);
            return Ok(_mapper.Map<IEnumerable<MenuDto>>(menus));
        }
    }
}