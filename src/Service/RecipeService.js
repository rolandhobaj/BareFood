import Recipe from '../Model/Recipe'

export default class RecipeService{
   static getAllRecipe(){
        return [
            new Recipe("Alma", ["Vacsi", "Desszert"]),
            new Recipe("Sör", ["Ebéd", "Desszert"]),
            new Recipe("Sushi", ["Vacsi", "Ebéd"]),
            new Recipe("Kivájt Pityi", ["Vacsi"]),
            new Recipe("Töltött káposzta", ["Ebéd"]),
            new Recipe("Húsimádó pizza", ["Vacs", "Ebéd"]),
            new Recipe("Somlói", ["Desszert"]),
            new Recipe("Fagyi", ["Desszert"]),
            ];
    }
}