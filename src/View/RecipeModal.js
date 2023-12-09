import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, TextInput, Image, Keyboard } from 'react-native';
import Modal from "react-native-modal";
import { Icon } from '@rneui/themed';
import Recipe from '../Model/Recipe'
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'

import * as ImagePicker from 'expo-image-picker';


export default function RecipeModal(props){
    const [image, setImage] = useState(null);
    
    const [name, setName] = useState(null);
    const [tags, setTags] = useState(null);

    const [nameIsEmpty, setNameIsEmpty] = useState(false);
    const [tagsIsEmpty, setTagsIsEmpty] = useState(false);

    const [imageName, setImageName] = useState("");
    const modifyNeedRefresh = useStore(s => s.modifyNeedRefresh);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    let selectedRecipe = useStore((state) => state.selectedRecipe);
    if (selectedRecipe == null){
      selectedRecipe = new Recipe(0, "Missing", "", "");
    }

    useEffect(() => {
       const keyboardDidShowListener = Keyboard.addListener(
         'keyboardDidShow',
         () => {
           setKeyboardVisible(true);
         }
       );
       const keyboardDidHideListener = Keyboard.addListener(
         'keyboardDidHide',
         () => {
           setKeyboardVisible(false);
         }
       );
   
       return () => {
         keyboardDidHideListener.remove();
         keyboardDidShowListener.remove();
       };
     }, []);

    const toggleModal = async () => {
        props.hideModal();
     };

     
    showName = selectedRecipe.name;
    if (name != null && name != showName){
      showName = name;
    }

    showTags = selectedRecipe.tags;
    if (tags != null && tags != showTags){
      showTags = tags;
    }

    showImage = selectedRecipe.imageName;
    if (image != null && image != showImage){
      showImage = image;
    }

    const saveImage = async() => {
      setNameIsEmpty(name == "");
      setTagsIsEmpty(tags == "");

      if (showName == "" || showTags ==""){
        return
      }

      toggleModal();
      if (selectedRecipe.name != "" && selectedRecipe.name != undefined){
        let splitBySlash = showImage.split('/');
        let t = splitBySlash[splitBySlash.length - 1].split('?')[0];
        RecipeService.deleteItem(selectedRecipe.name, false, (_) => RecipeService.addRecipe(new Recipe(showName, showName, showTags, t), showImage, modifyNeedRefresh));
      } else {
        RecipeService.addRecipe(new Recipe(showName, showName, showTags, imageName), showImage, modifyNeedRefresh);
      }
    }

     const pickImage = async () => {
       let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 4],
         quality: 0.3,
       });

       if (!result.canceled) {
         let fullUri = result.assets[0].uri;
         let splitBySlash = fullUri.split('/');
         setImageName(splitBySlash[splitBySlash.length - 1]);
         setImage(result.assets[0].uri);
       }
     };


    return (
        <Modal 
            testID='recipeModal'
            isVisible={props.isVisible}
            backdropOpacity={0.90}
            backdropTransitionOutTiming={0}
            style={{flex:1}}>
          <View style={{ flex: 1 }}>
            <Text style={{color:'white', margin:50, fontSize:25}}>Új recept hozzáadása</Text>
  
            <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'white', fontSize:17, padding:3, marginRight:10}}>Név:</Text>
                <TextInput placeholder="Írj ide..." width='78%' value={showName} onChangeText={setName} backgroundColor='white' 
                style={{paddingLeft:10, fontSize:17}} borderColor='red' borderWidth={nameIsEmpty ? 1.5 : 0}/>
            </View>
            
            <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'white', fontSize:17, padding:4, marginRight:10}}>Címkék:</Text>
                <TextInput placeholder="Vesszővel elválasztva..." width='69%' value={showTags} onChangeText={setTags} 
                backgroundColor='white' style={{paddingLeft:10, fontSize:17}} borderColor='red' borderWidth={tagsIsEmpty ? 1.5 : 0}/>
            </View>

            <View style={{ flex: 1, marginTop:20, alignItems:'center'}}>
              <TouchableOpacity onPress={pickImage}>
                  <View style={{flexDirection:'row', borderWidth:1, borderColor:'white', padding:5}}>
                    <Icon name='image' color='white' size={30} containerStyle={{marginRight:10}}/>
                    <Text style={{color:'white', fontSize:20}}>Válassz képet a galériából</Text>
                  </View>
              </TouchableOpacity>
              {showImage && !isKeyboardVisible && <Image source={{ uri: showImage }} style={{ width: 200, height: 200, marginTop:10 }} />}
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15, marginBottom:50}}>
                <TouchableOpacity onPress={toggleModal}>
                  <Icon name='close' color='grey' size={70} containerStyle={{marginLeft:20}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                  <Icon name='delete' color='grey' size={70}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveImage}>
                  <Icon name='done' color='green' size={70} containerStyle={{marginRight:20}}/>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    roundButton: {
      width: 50,  
      height: 50,   
      borderRadius: 60,            
      backgroundColor: 'rgba(72,110,115, 0.8)',                                    
      position: 'absolute',                                          
      bottom: 40,                                                    
      right: 40,
    }
  });