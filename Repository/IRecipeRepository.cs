using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Repository
{
    public interface IRecipeRepository
    {
        public int AddNewRecipe (Recipe recipe);
        public Recipe GetRecipe(int guid);
        public Recipe GetRecipe(string name);
        public IEnumerable<Recipe> GetAllRecipes();
    }
}
