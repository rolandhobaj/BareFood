import React from 'react';
import { FlatList, StyleSheet, View} from 'react-native';
import FoodCard from './src/FoodCard'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#b9def0'
  },
  item: {
    flex: 1,
    padding: 5,
    fontSize: 18,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'Backed Potato2' },
          { key: 'Sushi' },
          { key: 'etel' },
          { key: 'etel2' },
          { key: 'etel3' }]}
        renderItem={({ item }) =>
          <View style={{ flexDirection: 'row' }}>
            <FoodCard/>
            <FoodCard/>
          </View>
        }
      />
    </View>
  );
}

export default FlatListBasics;