function removeSpecialCharacters(text) {
    text = text.replace('Á', 'A');
    text = text.replace('É', 'E');
    text = text.replace('Í', 'I');
    text = text.replace('Ó', 'O');
    text = text.replace('Ö', 'O');
    text = text.replace('Ő', 'O');
    text = text.replace('Ú', 'U');
    text = text.replace('Ü', 'U');
    text = text.replace('Ű', 'U');
 
    return text;
  }

export default function filter(recipes, tag){
    let searchedTag = removeSpecialCharacters(tag.toUpperCase());
    return recipes.filter(recipe => {
        let recipeName = removeSpecialCharacters(recipe.name.toUpperCase());
        if (recipeName.includes(searchedTag)){
            return true;
        }

        var matchingTags = recipe.tags.filter(tag => {
            let recipeTag = removeSpecialCharacters(tag.toUpperCase());
            return recipeTag.includes(searchedTag);
        })

        return matchingTags.length != 0;
    });
}