import { React, useState } from 'react'
import { FlatList, View, Text } from 'react-native';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'


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

function filter(data, tag){
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

async function getMappedRecipes(tag, whenDone){
    let Data = (await RecipeService.getAllRecipe()).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    if (tag !== ''){
       Data =  filter(Data, tag);
    }

    const chunkSize = 2;
    let recipes = [];
    for (let i = 0; i < Data.length; i += chunkSize) {
        const chunk = Data.slice(i, i + chunkSize);
        if (chunk.length >= 2){
            recipes.push({
                firstKey:{name: chunk[0].name, imageName: chunk[0].imageName},
                secondKey:{name: chunk[1].name, imageName: chunk[1].imageName}
            })
        } else {
            recipes.push({
                firstKey:{name: chunk[0].name, imageName: chunk[0].imageName},
                secondKey:null
            })
        }
    }

    whenDone(recipes);
};

export default function FoodFlatList() {
        const [recipes, setRecipe] = useState(0);
        const [downloaded, setDownloaded] = useState(0);
        const searchedTag = useStore((state) => state.searchedTag)

        if (!downloaded){
            getMappedRecipes(searchedTag, setRecipe);
            setDownloaded(true);
        }

        return (
            <FlatList
                data={recipes}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row' }}>
                        <FoodCard style={{flex:2}} name={item.firstKey.name} imageName={item.firstKey.imageName}/>
                        {item.secondKey!= null ? <FoodCard name={item.secondKey.name} imageName={item.secondKey.imageName}/>: <View style={{width:'50%'}}/> }
                    </View>
                }
          />
        )
};