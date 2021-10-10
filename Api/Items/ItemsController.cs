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
        private readonly IItemRepository _itemRepository;

        public ItemsController(IItemRepository repository, IMapper mapper)
        {
            _itemRepository = repository;
            _mapper = mapper;
        }

        ///<summary>
        ///Creates item
        ///</summary>
        [HttpPost("categories/{categoryId}/items")]
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
        [HttpGet("categories/{categoryId}/items")]
        public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems(Guid categoryId)
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
            if (item == null)
            {
                return BadRequest("Item does not exist");
            }
            return Ok(_mapper.Map<ItemDto>(item));
        }

        ///<summary>
        ///Updates item
        ///</summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<ItemDto>> UpdateItem(Guid id, UpdateItemDto itemDto)
        {
            var i = await _itemRepository.Get(id);

            if (i == null)
            {
                return BadRequest("Item does not exist.");
            }

            i.Active = itemDto.Active;
            i.Description = itemDto.Description;
            i.Name = itemDto.Name;
            i.Price = itemDto.Price;
            i.CategoryId = itemDto.CategoryId;
            await _itemRepository.Update(i);
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