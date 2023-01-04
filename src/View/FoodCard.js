import { Text, Image, View } from 'react-native';
import { StyleSheet} from 'react-native';
import { useState, useEffect } from 'react';
import RecipeService from '../Service/RecipeService'

export default function FoodCard(props){
  const [imageUrl, setImageUrl] = useState(undefined);

  useEffect(() => {
    RecipeService.getImageUrl(props.imageName, url => setImageUrl(url)); 
  }, []);

  return (
      <View style={styles.container}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.text}>
          {props.name}
        </Text>
      </View>
    )
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