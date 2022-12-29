import React from 'react';
import { FlatList, StyleSheet, View, ImageBackground} from 'react-native';
import FoodSearchBar from './src/View/FoodSearchBar'
import FoodFlatList from './src/View/FoodFlatList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  image: {
    flex: 1,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/bg.png')} resizeMode="cover" style={styles.image}>
      <FoodSearchBar/>
      <FoodFlatList/>
      </ImageBackground>
    </View>
  );
}

export default FlatListBasics;