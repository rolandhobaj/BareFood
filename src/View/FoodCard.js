import { Text, Image, View, TouchableOpacity } from 'react-native';
import { StyleSheet} from 'react-native';
import React, { useState } from 'react';
import useStore from '../Model/Store'
import RecipeModal from '../View/RecipeModal'

async function getImageUrl(recipeService, imageName, whenDone){
  var result = await recipeService.getImageUrl(imageName);
  if (result == ""){
    whenDone("Not Found");
    return;
  }

  whenDone(result);
}


export default function FoodCard(props){
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const modifyNeedRefresh = useStore((state) => state.modifyNeedRefresh)

  if (props.imageUrl == undefined && imageUrl == ""){
    getImageUrl(props.recipeService, props.imageName, setImageUrl);
    return;
  }

  console.log("")

  return (
      <TouchableOpacity testID='FullFoodCard' style={styles.container} onPress={_ => setIsMenuVisible(false)} onLongPress={_ => setIsMenuVisible(true)}>
        {isMenuVisible ? <View testID='Menu' style={{zIndex:88, marginBottom: -75}}>
        <TouchableOpacity onPress={_ => {setIsMenuVisible(false); setIsModalVisible(true);}}>
          <Text style={{textAlign: 'center',
           color:'white', backgroundColor:'rgba(18,90,6,1)', borderRadius:5, 
           padding:7, marginLeft:'40%', fontSize:15,
           marginBottom:3}}>Módosítás</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={_ => {setIsMenuVisible(false); props.recipeService.deleteItem(props.name, true, modifyNeedRefresh);}}>
          <Text style={{textAlign: 'center', color:'white', 
          backgroundColor:'rgba(18,90,6,0.9)', borderRadius:5, padding:7, marginLeft:'40%',
           fontSize:15, marginBottom:3}}>Töröl</Text>
           </TouchableOpacity>
        </View> : null}
      <View style={{backgroundColor: 'rgba(18,57,6,0.35)', borderRadius:10, padding:10}}>
        {imageUrl != '' && imageUrl != "Not Found" ? <Image source={{uri: imageUrl}} style={styles.image} /> : null}
        <Text style={styles.text} testID="RecipeName" text={props.name}/>
      </View>
      {isModalVisible ? <RecipeModal name={props.name} tags={props.tags.join(", ")} imageUrl={imageUrl} hideModal={() => setIsModalVisible(false)}/> : null}
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