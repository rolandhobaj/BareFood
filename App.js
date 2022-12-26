import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements'
import { fonts } from 'react-native-elements/dist/config';

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   backgroundColor : '#b9def0'
  },
  item: {
    flex : 1,
    padding: 10,
    fontSize: 18,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Backed Potato2'},
          {key: 'Sushi'},
          {key: 'etel'},
          {key: 'etel2'}]}
        renderItem={({item}) => 
        <Card containerStyle={{backgroundColor: '#f4faf0'}}>
          <Image source={require('./Images/B.jpg')} style={{ width: null, height: 250 }}/>
          <Text style={{margin: 10, fontSize: 22, fontWeight: 'bold'}}>
            {item.key}
          </Text>
        </Card>   
      }
      />
    </View>
  );
}

export default FlatListBasics;