import { React, useState, useEffect } from 'react'
import { ScrollView, Text, ActivityIndicator } from 'react-native';

import RecipeService from '../Service/RecipeService'
import filter from '../Common/Filter'
import useStore from '../Model/Store'
import RecipeCard from '../View/RecipeCard'
import { View } from 'react-native';

async function downloadList(whenDone){
    let data = (await RecipeService.getAllRecipe()).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    whenDone(data);
}

function getFilteredRecipes(data, tag){
    if (data.length == 0){
        return [];
    }

    if (tag !== ''){
       data =  filter(data, tag);
    }

    return data;
};


export default function FoodFlatList() {
        const [recipes, setRecipe] = useState([]);
        const searchedTag = useStore((state) => state.searchedTag)

        useEffect(() => {
            downloadList(data => {
                setRecipe(data);
            });
          }, []);

        const isEmptyArray = (arr) => arr.length === 0;

        var mappedRecipes = getFilteredRecipes(recipes, searchedTag);

        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                isEmptyArray(recipes) ? 
                (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="green" />
                        <Text style={{ marginLeft: 10, color: "green", fontSize: 25}}>Minnyá na..</Text>
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: 20}}>
                        {mappedRecipes.map((recipe) => (
                            <RecipeCard key={recipe.name} name={recipe.name} tags={recipe.tags} imageName={recipe.imageName}/>))}
                    </ScrollView>
                )
            }
         </View>
        )
};