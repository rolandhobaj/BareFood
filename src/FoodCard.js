import { React, Component } from 'react'
import { Text, Image, View } from 'react-native';
import { StyleSheet} from 'react-native';

export default class FoodCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../images/B.jpg')} style={styles.image} />
        <Text style={styles.text}>
          {this.props.name}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(18,57,6,0.35)',
    flex: 1,
    textAlignVertical: 'center',
    borderRadius:40,
    margin:10,
    padding:10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: null, 
    height: 130, 
  },
  text: {
    marginTop:10,
    fontSize: 16, 
    
    fontWeight: 'bold', 
    color: '#ffffff',
    textAlign: 'center',
  }
});