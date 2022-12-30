import React from 'react';
import { TouchableOpacity, StyleSheet, View, ImageBackground, Text} from 'react-native';
import FoodSearchBar from './src/View/FoodSearchBar'
import FoodFlatList from './src/View/FoodFlatList'
import { Icon } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  image: {
    flex: 1,
  },
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

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/bg.png')} resizeMode="cover" style={styles.image}>
      <FoodSearchBar/>
      <FoodFlatList/>
      <TouchableOpacity
        style={styles.roundButton}>
           <Icon name='add' color='white' size={40} containerStyle={{margin:5}}
      />
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default FlatListBasics;