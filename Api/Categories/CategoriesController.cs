using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Categories
{
    [ApiController]
    [Route("/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly CategoryRepository _repository;

        public CategoriesController(CategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }


        ///<summary>
        ///Creates category
        ///</summary>
        [HttpPost("/menus/{menuId}/categories")]
        public async Task<ActionResult> CreateCategory(Guid menuId, CreateCategoryDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            category.MenuId = menuId;
            await _repository.CreateCategory(category);
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, _mapper.Map<CategoryDto>(category));
        }

        ///<summary>
        ///Gets categories by menu id
        ///</summary>
        [HttpGet("/menus/{menuId}/categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories(Guid menuId)
        {
            var categories = await _repository.GetCategories(menuId);
            return Ok(_mapper.Map<IEnumerable<CategoryDto>>(categories));
        }

        ///<summary>
        ///Gets category by id
        ///</summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(Guid id)
        {
            var category = await _repository.GetCategory(id);
            return Ok(_mapper.Map<CategoryDto>(category));
        }
    }
}