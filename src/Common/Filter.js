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

export default function filter(data, tag){
    let searchedTag = removeSpecialCharacters(tag.toUpperCase());
    return data.filter(r => {
        let recipeName = removeSpecialCharacters(r.name.toUpperCase());
        if (recipeName.includes(searchedTag)){
            return true
        }

        for (let i = 0; i < r.tags.length; i++) {
            let recipeTag = removeSpecialCharacters(r.tags[i].toUpperCase());
            if (recipeTag.includes(searchedTag)){
                return true;
            }
        }

        return false;
    });
}