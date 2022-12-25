import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements'

const logo = {
  uri: 'https://www.allrecipes.com/thmb/c_2gXiAwkO6u1UJCY-1eAVCy0h0=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/54679_perfect-baked-potato-Rita-1x1-1-91711252bb3740088c8ea55c5f9bef1c.jpg',
  width: 200,
  height: 200
};

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const FlatListBasics = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          {key: 'Backed Potato'},
          {key: 'Sushi'},
          {key: 'etel'},
          {key: 'etel2'},
        ]}
        renderItem={({item}) => 
        <Card title='HELLO WORLD'>
          <Image source={logo} />
          <Text style={{margin: 10}}>
            {item.key}
          </Text>
        </Card>   
      }
      />
    </View>
  );
}

export default FlatListBasics;