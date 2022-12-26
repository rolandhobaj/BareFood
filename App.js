import React from 'react';
import { FlatList, StyleSheet, View, ImageBackground} from 'react-native';
import FoodCard from './src/FoodCard'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10
  },
  item: {
    flex: 1,
    padding: 5,
    fontSize: 18,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./images/bg.png')} resizeMode="cover" style={styles.image}>
      <FlatList
        data={[
          { key: 'Backed Potato2' },
          { key: 'Sushi' },
          { key: 'etel' },
          { key: 'etel2' },
          { key: 'etel3' }]}
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