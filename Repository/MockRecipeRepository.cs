using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public class MockRecipeRepository : IRecipeRepository
    {
        private int lastId = 1;

        public int AddNewRecipe (Recipe recipe)
        {
            if (recipe.Id == 0) {
                recipe.Id = lastId;
                ++lastId;
            }

            return recipe.Id;
        }

        public Recipe GetRecipe (int id)
        {
            if (id <= 0) {
                throw new ArgumentException ("Bad Id format");
            }

            // Todo
            Recipe recipe = new Recipe ();

            recipe.Name = "Sütii";

            return recipe;
        }

        public Recipe GetRecipe(string name)
        {
            // Todo
            Recipe recipe = new Recipe ();

            recipe.Name = name;

            return recipe;
        }

        public IEnumerable<Recipe> GetAllRecipes ()
        {
            List<Recipe> recipeList = new List<Recipe>();

            Recipe recipe = new Recipe ();
            recipe.Name = "kecske";

            recipeList.Add(recipe);

            Recipe recipe2 = new Recipe();
            recipe2.Name = "kecske2";

            recipeList.Add(recipe2);

            return recipeList;
        }
    }
}
