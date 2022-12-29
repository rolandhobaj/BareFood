import { React, Component } from 'react'
import { FlatList, View, Text } from 'react-native';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'

export default class FoodFlatList extends Component {

    getMappedRecipes(){
        const Data = RecipeService.getAllRecipe().sort((a, b) => a.key.toUpperCase() > b.key.toUpperCase());

        const chunkSize = 2;
        let recipes = [];
        for (let i = 0; i < Data.length; i += chunkSize) {
            const chunk = Data.slice(i, i + chunkSize);
            if (chunk.length >= 2){
                recipes.push({
                    firstKey:chunk[0].key,
                    secondKey:chunk[1].key
                })
            } else {
                recipes.push({
                    firstKey:chunk[0].key,
                    secondKey:null
                })
            }
        }
        return recipes;
    }

    render() {
        return (
            <FlatList
                data={this.getMappedRecipes()}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row' }}>
                        <FoodCard style={{flex:2}} name={item.firstKey}/>
                        {item.secondKey!= null ? <FoodCard name={item.secondKey}/>: <View style={{width:'50%'}}/> }
                    </View>
                }
          />
        )
    }
}