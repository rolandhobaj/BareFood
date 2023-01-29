import { React, useState } from 'react'
import { FlatList, View, Text, ScrollView } from 'react-native';
import uuid from 'react-native-uuid';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'
import filter from '../Common/Filter'
import useStore from '../Model/Store'



async function downloadList(whenDone){
    let data = (await RecipeService.getAllRecipe()).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    whenDone(data);
}

function getMappedRecipes(data, tag){
    if (data.length == 0){
        return [];
    }

    if (tag !== ''){
       data =  filter(data, tag);
    }

    const chunkSize = 2;
    let recipes = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        if (chunk.length >= 2){
            recipes.push({
                firstKey:{name: chunk[0].name, imageName: chunk[0].imageName, tags:chunk[0].tags},
                secondKey:{name: chunk[1].name, imageName: chunk[1].imageName, tags:chunk[1].tags}
            })
        } else {
            recipes.push({
                firstKey:{name: chunk[0].name, imageName: chunk[0].imageName, tags:chunk[0].tags},
                secondKey:null
            })
        }
    }

    return recipes;
};


export default function FoodFlatList() {
        const [recipes, setRecipe] = useState([]);
        const searchedTag = useStore((state) => state.searchedTag)
        const needRefresh = useStore((state) => state.needRefresh)
        const modifyNeedRefresh = useStore((state) => state.modifyNeedRefresh)

        if (needRefresh){
            downloadList(setRecipe);
            modifyNeedRefresh(false);
        }
        
        var recipeViewlist = []
        var mappedRecipes = getMappedRecipes(recipes, searchedTag);
        for (let i = 0; i< mappedRecipes.length; ++i){
            let item = mappedRecipes[i];
            recipeViewlist.push( 
                <View key={uuid.v4()} style={{ flexDirection: 'row' }}>
                    <FoodCard recipeService={RecipeService} style={{flex:2}} tags={item.firstKey.tags} name={item.firstKey.name} imageName={item.firstKey.imageName}/>
                    {item.secondKey!= null ? <FoodCard recipeService={RecipeService} name={item.secondKey.name} tags={item.firstKey.tags} imageName={item.secondKey.imageName}/>: <View style={{width:'50%'}}/> }
                </View>
                )
        }

        return (
            <ScrollView>
                {recipeViewlist}
            </ScrollView>
        )
};