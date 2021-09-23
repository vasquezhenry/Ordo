using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Items
{
    [ApiController]
    [Route("/api/items")]
    public class ItemsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ItemRepository _repository;

        public ItemsController(ItemRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpPost("/api/categories/{categoryId}/items")]
        public async Task<ActionResult<ItemDto>> CreateItem(Guid categoryId, CreateItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);
            item.CategoryId = categoryId;
            await _repository.CreateItem(item);
            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, _mapper.Map<ItemDto>(item));
        }

        [HttpGet("/api/categories/{categoryId}/items")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems(Guid categoryId)
        {
            var items = await _repository.GetItems(categoryId);
            return Ok(_mapper.Map<IEnumerable<ItemDto>>(items));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItem(Guid id)
        {
            var item = await _repository.GetItem(id);
            return Ok(_mapper.Map<ItemDto>(item));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ItemDto>> UpdateItem(Guid id, UpdateItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);
            await _repository.UpdateItem(id, item);
            return NoContent();
        }

    }
}