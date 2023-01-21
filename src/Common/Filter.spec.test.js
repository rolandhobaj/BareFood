import Recipe from '../Model/Recipe';
import filter from './Filter'

it('returns filtered list based on name', () => {
    
    var recipe1 = new Recipe("1", "Recipe1", ["tag1", "tag2"], "image1");
    var recipe2 = new Recipe("2", "Recipe2", ["tag3", "tag4"], "image2");
    
    var recipeList = [recipe1, recipe2];

    const result = filter(recipeList, "Recipe1");

    expect(result[0]).toEqual(recipe1);
});

it('returns filtered list based on tag', () => {
    
    var recipe1 = new Recipe("1", "Recipe1", ["tag1", "tag2"], "image1");
    var recipe2 = new Recipe("2", "Recipe2", ["tag3", "tag4"], "image2");
    
    var recipeList = [recipe1, recipe2];

    const result = filter(recipeList, "tag1");

    expect(result[0]).toEqual(recipe1);
});

it('returns filtered list on semi info', () => {
    
    var recipe1 = new Recipe("1", "Recipe1", ["tag1", "tag2"], "image1");
    var recipe2 = new Recipe("2", "Recipe2", ["tag3", "tag4"], "image2");
    
    var recipeList = [recipe1, recipe2];

    const result = filter(recipeList, "cipe2");

    expect(result[0]).toEqual(recipe2);
});

it('returns filtered list with specia char', () => {
    
    var recipe1 = new Recipe("1", "Récipe1", ["tag1", "tag2"], "image1");
    var recipe2 = new Recipe("2", "Récipe2", ["tag3", "tag4"], "image2");
    
    var recipeList = [recipe1, recipe2];

    const result = filter(recipeList, "recipe2");

    expect(result[0]).toEqual(recipe2);
});

it('returns full list when empty tag', () => {
    
    var recipe1 = new Recipe("1", "Récipe1", ["tag1", "tag2"], "image1");
    var recipe2 = new Recipe("2", "Récipe2", ["tag3", "tag4"], "image2");
    
    var recipeList = [recipe1, recipe2];

    const result = filter(recipeList, "");

    expect(result).toEqual(recipeList);
});