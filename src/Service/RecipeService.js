import Recipe from '../Model/Recipe'

export default class RecipeService{
   static getAllRecipe(){
        return [
            new Recipe("Alma", ["Köret"]),
            new Recipe("Sör", ["Főétel", "Desszert"]),
            new Recipe("Sushi", ["Főétel"]),
            new Recipe("Tárkonyos leves", ["Leves"]),
            new Recipe("Kivájt Pityi", ["Főétel"]),
            new Recipe("Töltött káposzta", ["Főétel"]),
            new Recipe("Húsimádó pizza", ["Főétel"]),
            new Recipe("Rizs", ["Köret"]),
            new Recipe("Pityi", ["Köret"]),
            new Recipe("Somlói", ["Köret"]),
            new Recipe("Fagyi", ["Desszert"]),
            ];
    }
}