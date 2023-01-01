import { React, Component } from 'react'
import { FlatList, View, Text } from 'react-native';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'
import Recipe from '../Model/Recipe';


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

function getMappedRecipes(tag){
    //RecipeService.writeRecipes();
    let Data = RecipeService.getAllRecipe().sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    if (tag !== ''){
       Data =  filter(Data, tag);
    }

    const chunkSize = 2;
    let recipes = [];
    for (let i = 0; i < Data.length; i += chunkSize) {
        const chunk = Data.slice(i, i + chunkSize);
        if (chunk.length >= 2){
            recipes.push({
                firstKey:chunk[0].name,
                secondKey:chunk[1].name
            })
        } else {
            recipes.push({
                firstKey:chunk[0].name,
                secondKey:null
            })
        }
    }
    return recipes;
};

export default function FoodFlatList() {
        const searchedTag = useStore((state) => state.searchedTag)
        return (
            <FlatList
                data={getMappedRecipes(searchedTag)}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row' }}>
                        <FoodCard style={{flex:2}} name={item.firstKey}/>
                        {item.secondKey!= null ? <FoodCard name={item.secondKey}/>: <View style={{width:'50%'}}/> }
                    </View>
                }
          />
        )
};