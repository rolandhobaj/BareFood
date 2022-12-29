import { React, Component } from 'react'
import { FlatList, View } from 'react-native';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'

export default class FoodFlatList extends Component {
    render() {
        return (
            <FlatList
                data={RecipeService.getAllRecipe()}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row' }}>
                        <FoodCard name={item.key}/>
                        <FoodCard name={item.key}/>
                    </View>
                }
          />
        )
    }
}