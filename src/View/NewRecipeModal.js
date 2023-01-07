import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, TextInput, Image } from 'react-native';
import Modal from "react-native-modal";
import { Icon } from '@rneui/themed';
import Recipe from '../Model/Recipe'
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'

import * as ImagePicker from 'expo-image-picker';


export default function NewRecipeModal(){
    const [isModalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [tags, setTags] = useState("");
    const [imageName, setImageName] = useState("");
    const modifyNeedRefresh = useStore(s => s.modifyNeedRefresh);

    const toggleModal = async () => {
      setModalVisible(!isModalVisible);
      if (!isModalVisible){
        setName("");
        setTags("");
        setImageName("");
      }
     };

    const saveImage = async() => {
      if (name == "" || tags =="" || imageName == ""){
        return
      }

      toggleModal();
      RecipeService.addRecipe(new Recipe(name, tags, imageName), image, modifyNeedRefresh)
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
      <View>
       <TouchableOpacity
          onPress={toggleModal}
          style={styles.roundButton}>
             <Icon name='add' color='white' size={40} containerStyle={{margin:5}}/>
  
        <Modal 
            isVisible={isModalVisible} 
            backdropOpacity={0.90}
            backdropTransitionOutTiming={0}
            style={{flex:1}}>
          <View style={{ flex: 1 }}>
            <Text style={{color:'white', margin:50, fontSize:25}}>Új recept hozzáadása</Text>
  
            <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'white', fontSize:17, padding:3, marginRight:10}}>Név:</Text>
                <TextInput placeholder="Írj ide.,." width='78%' onChangeText={setName} backgroundColor='white' style={{paddingLeft:10, fontSize:17}}/>
            </View>
            
            <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'white', fontSize:17, padding:4, marginRight:10}}>Címkék:</Text>
                <TextInput placeholder="Vesszővel elválasztva..." width='69%' onChangeText={setTags} backgroundColor='white' style={{paddingLeft:10, fontSize:17}}/>
            </View>

            <View style={{ flex: 1, marginTop:20, alignItems:'center'}}>
              <TouchableOpacity onPress={pickImage}>
                  <View style={{flexDirection:'row', borderWidth:1, borderColor:'white', padding:5}}>
                    <Icon name='image' color='white' size={30} containerStyle={{marginRight:10}}/>
                    <Text style={{color:'white', fontSize:20}}>Válassz képet a galériából</Text>
                  </View>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15, marginBottom:70}}>
                <TouchableOpacity onPress={x =>toggleModal}>
                  <Icon name='close' color='grey' size={70} containerStyle={{marginLeft:20}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveImage}>
                  <Icon name='done' color='green' size={70} containerStyle={{marginRight:20}}/>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
  
        </TouchableOpacity>
      </View>
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