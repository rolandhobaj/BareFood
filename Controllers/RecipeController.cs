using Microsoft.AspNetCore.Mvc;
using Model;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepository;

        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepository  = recipeRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Recipe>> GetAllRecipes()
        {
            IEnumerable<Recipe> recipes = _recipeRepository.GetAllRecipes();

            return Ok(recipes);
        }

        [HttpGet("Id/{id}")]
        public ActionResult<Recipe> GetRecipe(int id)
        {
            Recipe recipe;
            try
            {
                recipe = _recipeRepository.GetRecipe(id);
            }catch (ArgumentException)
            {
                return BadRequest();
            }

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }

        [HttpGet("Name/{name}")]
        public ActionResult<Recipe> GetRecipe(string name)
        {
            Recipe recipe = _recipeRepository.GetRecipe(name);

            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe);
        }
    }
}
