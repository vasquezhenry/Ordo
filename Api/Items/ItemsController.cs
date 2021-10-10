using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Items
{
    [ApiController]
    [Route("/items")]
    public class ItemsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ItemRepository _itemRepository;

        public ItemsController(ItemRepository repository, IMapper mapper)
        {
            _itemRepository = repository;
            _mapper = mapper;
        }

        ///<summary>
        ///Creates item
        ///</summary>
        [HttpPost("/categories/{categoryId}/items")]
        public async Task<ActionResult<ItemDto>> CreateItem(Guid categoryId, CreateItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);
            item.CategoryId = categoryId;
            await _itemRepository.Create(item);
            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, _mapper.Map<ItemDto>(item));
        }

        ///<summary>
        ///Gets items by category id
        ///</summary>
        [HttpGet("/categories/{categoryId}/items")]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems(Guid categoryId)
        {
            var items = await _itemRepository.GetByCategoryId(categoryId);
            return Ok(_mapper.Map<IEnumerable<ItemDto>>(items));
        }

        ///<summary>
        ///Gets a specific item by id
        ///</summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemDto>> GetItem(Guid id)
        {
            var item = await _itemRepository.Get(id);
            return Ok(_mapper.Map<ItemDto>(item));
        }

        ///<summary>
        ///Updates item
        ///</summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ItemDto>> UpdateItem(Guid id, UpdateItemDto itemDto)
        {
            var item = _mapper.Map<Item>(itemDto);
            await _itemRepository.Update(item);
            return NoContent();
        }

        ///<summary>
        ///Delete item
        ///</summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(Guid id)
        {
            await _itemRepository.Delete(id);
            return NoContent();
        }

    }
}