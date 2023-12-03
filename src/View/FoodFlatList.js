import { React, useState, useEffect } from 'react'
import { ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';

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

    return data;
};


export default function FoodFlatList() {
        const [recipes, setRecipe] = useState([]);
        const searchedTag = useStore((state) => state.searchedTag)

        useEffect(() => {
            downloadList(setRecipe);
          }, []);
        

        var mappedRecipes = getMappedRecipes(recipes, searchedTag);

        return (
         <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: 20}}>
             {mappedRecipes.map((card) => (
                <Card key={card.imageName} mode='outline' style={{width: '48%', marginBottom:15, backgroundColor: 'rgba(18,57,6,0.35)'}}>
                    <Card.Cover source={{ uri: card.imageName} }  style={{ margin: 8, height: 120, backgroundColor: 'red'}}/>
                    <Card.Content style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Title style={{ fontSize: 17, color: 'white', fontWeight: 'bold',}}>{card.name}</Title>
                    </Card.Content>
                </Card>))}
         </ScrollView>
        )
};