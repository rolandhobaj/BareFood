import { React, Component } from 'react'
import { Card } from 'react-native-elements'
import { Text, Image } from 'react-native';
import { StyleSheet} from 'react-native';

export default class FoodCard extends Component {
  render() {
    return (
      <Card containerStyle={styles.container}>
        <Image source={require('../images/B.jpg')} style={styles.image} />
        <Text style={styles.text}>
          {this.props.name}
        </Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4faf0',
    borderRadius: 40,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8, },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17
  },
  image: {
    width: null, 
    height: 130, 
    borderRadius: 40
  },
  text: {
    margin: 5, 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#5884cc'
  }
});