import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements'
import { fonts } from 'react-native-elements/dist/config';

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
            <Card containerStyle={{ backgroundColor: '#f4faf0', borderRadius: 40, flex: 1, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 12,
},
shadowOpacity: 0.4,
shadowRadius: 16.00,

elevation: 24 }}>
              <Image source={require('./images/B.jpg')} style={{ width: null, height: 130, borderRadius: 40 }} />
              <Text style={{ margin: 5, fontSize: 17, fontWeight: 'bold', color: '#5884cc' }}>
                {item.key}
              </Text>
            </Card>
            <Card containerStyle={{
              backgroundColor: '#f4faf0', borderRadius: 40, flex: 1, shadowColor: "#000",
              shadowOffset: {width: 0,height: 8,},
              shadowOpacity: 0.46,
              shadowRadius: 11.14,

              elevation: 17,
            }}>
              <Image source={require('./images/B.jpg')} style={{ width: null, height: 130, borderRadius: 40 }} />
              <Text style={{ margin: 5, fontSize: 17, fontWeight: 'bold', color: '#5884cc' }}>
                {item.key}
              </Text>
            </Card>
          </View>
        }
      />
    </View>
  );
}

export default FlatListBasics;