import React from 'react';
import { FlatList, StyleSheet, View, ImageBackground} from 'react-native';
import FoodCard from './src/View/FoodCard'
import FoodSearchBar from './src/View/FoodSearchBar'

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
      <FlatList
        data={[
          { key: 'Sült pityi' },
          { key: 'Sushi' },
          { key: 'Etel' },
          { key: 'Etel2' },
          { key: 'Etel3' }]}
        renderItem={({ item }) =>
          <View style={{ flexDirection: 'row' }}>
            <FoodCard name={item.key}/>
            <FoodCard name={item.key}/>
          </View>
        }
      />
      </ImageBackground>
    </View>
  );
}

export default FlatListBasics;