import { React, Component } from 'react'
import { FlatList, View, Text } from 'react-native';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'


function filter(data, tag){
    return data.filter(r => {
        for (let i = 0; i < r.tags.length; i++) {
            if (r.tags[i].toUpperCase().includes(tag.toUpperCase())){
                return true;
            }
        }

        return false;
    });
}

function getMappedRecipes(tag){
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