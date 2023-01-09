import { Text, Image, View, TouchableOpacity } from 'react-native';
import { StyleSheet} from 'react-native';
import RecipeService from '../Service/RecipeService'
import React, { useState } from 'react';
import useStore from '../Model/Store'


export default function FoodCard(props){
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const modifyNeedRefresh = useStore((state) => state.modifyNeedRefresh)
  const modifyRecipeModalVisible = useStore((state) => state.modifyRecipeModalVisible)

  return (
      <TouchableOpacity style={styles.container} onPress={_ => setIsMenuVisible(false)} onLongPress={_ => setIsMenuVisible(true)}>
        {isMenuVisible ?<View style={{zIndex:88, marginBottom: -75}}>
        <TouchableOpacity onPress={_ => {setIsMenuVisible(false); modifyRecipeModalVisible(true);}}>
          <Text style={{textAlign: 'center',
           color:'white', backgroundColor:'rgba(18,90,6,1)', borderRadius:5, 
           padding:7, marginLeft:'40%', fontSize:15,
           marginBottom:3}}>Módosítás</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_ => {setIsMenuVisible(false); RecipeService.deleteItem(props.name, modifyNeedRefresh);}}>
          <Text style={{textAlign: 'center', color:'white', 
          backgroundColor:'rgba(18,90,6,0.9)', borderRadius:5, padding:7, marginLeft:'40%',
           fontSize:15, marginBottom:3}}>Töröl</Text>
           </TouchableOpacity>
        </View> : null}
      <View style={{backgroundColor: 'rgba(18,57,6,0.35)', borderRadius:10, padding:10}}>
        {props.imageName != '' ? <Image source={{uri: props.imageName}} style={styles.image} /> : null}
        <Text style={styles.text}>
          {props.name}
        </Text>
      </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
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