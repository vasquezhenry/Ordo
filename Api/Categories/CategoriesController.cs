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
        private readonly CategoryRepository _categoryRepository;

        public CategoriesController(CategoryRepository repository, IMapper mapper)
        {
            _categoryRepository = repository;
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
            await _categoryRepository.Create(category);
            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, _mapper.Map<CategoryDto>(category));
        }

        ///<summary>
        ///Gets categories by menu id
        ///</summary>
        [HttpGet("/menus/{menuId}/categories")]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories(Guid menuId)
        {
            var categories = await _categoryRepository.GetByMenuId(menuId);
            return Ok(_mapper.Map<IEnumerable<CategoryDto>>(categories));
        }

        ///<summary>
        ///Gets category by id
        ///</summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategory(Guid id)
        {
            var category = await _categoryRepository.Get(id);
            return Ok(_mapper.Map<CategoryDto>(category));
        }
    }
}