using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Ordo.Services.Catalog.API.Categories
{
    [ApiController]
    [Route("/categories")]
    public class CategoriesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository repository, IMapper mapper)
        {
            _categoryRepository = repository;
            _mapper = mapper;
        }


        ///<summary>
        ///Creates category
        ///</summary>
        [HttpPost("menus/{menuId}/categories")]
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
        [HttpGet("menus/{menuId}/categories")]
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
            if (category == null)
            {
                return BadRequest("Category does not exists");
            }
            return Ok(_mapper.Map<CategoryDto>(category));
        }

        ///<summary>
        ///Update category by id
        ///</summary>
        [HttpPut("{id}")]
        public async Task<ActionResult<CategoryDto>> UpdateCategory(Guid id, UpdateCategoryDto categoryDto)
        {
            var cat = await _categoryRepository.Get(id);
            if (cat == null)
            {
                return BadRequest("Category does not exists");
            }
            cat.Name = categoryDto.Name;
            cat.Description = categoryDto.Description;
            await _categoryRepository.Update(cat);
            return Ok(_mapper.Map<CategoryDto>(cat));
        }

        /// <summary>Delete category by id</summary>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(Guid id)
        {
            await _categoryRepository.Delete(id);
            return NoContent();
        }
    }
}