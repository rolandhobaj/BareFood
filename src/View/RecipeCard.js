import { Card } from 'react-native-paper';
import { Text, View } from 'react-native';
import { React, useState, useEffect } from 'react'
import RecipeModal from '../View/RecipeModal'

import Recipe from '../Model/Recipe'
import useStore from '../Model/Store'
import RecipeService from '../Service/RecipeService'

export default function RecipeCard(props) {

    const modifySelectedRecipe = useStore((state) => state.modifySelectedRecipe)
    const [imageUri, setImageUri] = useState(null);
    const [isMenuVisible, setMenuVisible] = useState(false);


    const handlePress = (recipe) => {
        modifySelectedRecipe(recipe);
        setMenuVisible(true);
      };


    useEffect(() => {
        RecipeService.getImageUrl(props.imageName, imageUri => {
            setImageUri(imageUri)
        });
      }, null);


    return (
        <Card key={props.name} mode='outline' style={{width: '48%', marginBottom:12, backgroundColor: 'rgba(18,57,6,0.35)'}} onPress={() => handlePress(new Recipe(props.name, props.tags.join(", "), props.imageName, imageUri))}>
            <Card.Cover source={{ uri: imageUri }} style={{ margin: 8, height: 120 }}/>
            <Card.Content style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 15, color: 'white', fontWeight: 'bold', textAlign: 'center'}}>{props.name}</Text>
                <RecipeModal title="Recept módosítása" isVisible={isMenuVisible} hideModal={() => {setMenuVisible(false);}}/>
            </Card.Content>
        </Card>
    )

}