import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, TextInput, Image, Keyboard } from 'react-native';
import { Icon } from '@rneui/themed';
import RecipeModal from '../View/RecipeModal'
import useStore from '../Model/Store'


export default function NewRecipeButton(){
    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
      <View>
       <TouchableOpacity
          testID='showModalButton'
          onPress={_ => setIsModalVisible(true)}
          style={styles.roundButton}>
             <Icon name='add' color='white' size={40} containerStyle={{margin:5}}/>
        </TouchableOpacity>
        {isModalVisible ? <RecipeModal testID='recipeModal' hideModal={() => setIsModalVisible(false)}/> : null}
      </View>
    );
}

const styles = StyleSheet.create({
    roundButton: {
      width: 50,  
      height: 50,   
      borderRadius: 60,            
      backgroundColor: 'rgba(72,110,115, 0.8)',                                    
      position: 'absolute',                                          
      bottom: 40,                                                    
      right: 40,
    }
  });