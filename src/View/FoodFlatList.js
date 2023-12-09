import { React, useState, useEffect } from 'react'
import { ScrollView, Text, ActivityIndicator } from 'react-native';
import { Card } from 'react-native-paper';

import RecipeService from '../Service/RecipeService'
import filter from '../Common/Filter'
import useStore from '../Model/Store'
import Recipe from '../Model/Recipe'
import RecipeModal from '../View/RecipeModal'
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
        const [isMenuVisible, setMenuVisible] = useState(false);
        const modifySelectedRecipe = useStore((state) => state.modifySelectedRecipe)

        useEffect(() => {
            downloadList(setRecipe);
          }, []);
        
        const handlePress = (recipe) => {
            modifySelectedRecipe(recipe);
            setMenuVisible(true);
          };

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
                    <View>
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', padding: 20}}>
                            {mappedRecipes.map((card, index) => (
                                <Card key={card.imageName} mode='outline' style={{width: '48%', marginBottom:12, backgroundColor: 'rgba(18,57,6,0.35)'}} onPress={() => handlePress(new Recipe(card.name, card.tags.join(", "), card.imageName))}>
                                    <Card.Cover source={{ uri: card.imageName} }  style={{ margin: 8, height: 120}}/>
                                    <Card.Content style={{ alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{card.name}</Text>
                                </Card.Content>
                                </Card>))}
                        </ScrollView>
                    <RecipeModal title="Recept módosítása" isVisible={isMenuVisible} hideModal={() => {setMenuVisible(false); setRecipe([]); downloadList(setRecipe)}}/>
                    </View>
                )
            }
           
         </View>
        )
};