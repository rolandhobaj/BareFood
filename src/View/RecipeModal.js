import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, TextInput, Image, Keyboard } from 'react-native';
import Modal from "react-native-modal";
import { Icon } from '@rneui/themed';
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'

import * as ImagePicker from 'expo-image-picker';


export default function RecipeModal(props) {
  const modifyNeedRefresh = useStore(s => s.modifyNeedRefresh);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const modifySelectedRecipe = useStore((state) => state.modifySelectedRecipeUpdater)

  let selectedRecipe = useStore((state) => state.selectedRecipe);
  let selectedRecipeOriginalName = useStore((state) => state.selectedRecipeOriginalName);

  const modifyName = (name) => modifySelectedRecipe(selected => ({ ...selected, name }));
  const modifyTags = (tags) => modifySelectedRecipe(selected => ({ ...selected, tags }));
  const modifyImage = (imageName, imageUri) =>modifySelectedRecipe( selected => ({ ...selected, imageName, imageUri}));
    

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

  const toggleModalWithRefresh = async () => {
    props.hideModal();
    modifyNeedRefresh(true);
  };

  const saveImage = async () => {
    if (selectedRecipeOriginalName == "", selectedRecipe.name == "" || selectedRecipe.tags == "") {
      return
    }

    if (props.mode == "editing") {
      await RecipeService.deleteItem(selectedRecipeOriginalName, selectedRecipe.imageName, () => RecipeService.addRecipe(selectedRecipe, toggleModalWithRefresh), false);
    } else {
      await RecipeService.addRecipe(selectedRecipe, toggleModalWithRefresh);
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
      modifyImage(splitBySlash[splitBySlash.length - 1], result.assets[0].uri);
    }
  };

  return (
    <Modal
      testID='recipeModal'
      isVisible={props.isVisible}
      backdropOpacity={0.90}
      backdropTransitionOutTiming={0}
      style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white', marginTop: 50, marginBottom: 50, textAlign: 'center', fontSize: 25 }}>{props.title}</Text>

        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ color: 'white', fontSize: 17, padding: 3, marginRight: 10 }}>Név:</Text>
          <TextInput placeholder="Írj ide..." width='78%' value={selectedRecipe.name} onChangeText={modifyName} backgroundColor='white'
            style={{ paddingLeft: 10, fontSize: 17 }} borderColor='red' borderWidth={selectedRecipe.name === '' ? 1.5 : 0} />
        </View>

        <View style={{ flexDirection: 'row', margin: 10 }}>
          <Text style={{ color: 'white', fontSize: 17, padding: 4, marginRight: 10 }}>Címkék:</Text>
          <TextInput placeholder="Vesszővel elválasztva..." width='69%' value={selectedRecipe.tags} onChangeText={modifyTags}
            backgroundColor='white' style={{ paddingLeft: 10, fontSize: 17 }} borderColor='red' borderWidth={selectedRecipe.tags === '' ? 1.5 : 0} />
        </View>

        <View style={{ flex: 1, marginTop: 20, alignItems: 'center' }}>
          <TouchableOpacity onPress={pickImage}>
            <View style={{ flexDirection: 'row', borderWidth: 1, borderColor: 'white', padding: 5 }}>
              <Icon name='image' color='white' size={30} containerStyle={{ marginRight: 10 }} />
              <Text style={{ color: 'white', fontSize: 20 }}>Válassz képet a galériából</Text>
            </View>
          </TouchableOpacity>
          {selectedRecipe.imageUri && !isKeyboardVisible && <Image source={{ uri: selectedRecipe.imageUri }} style={{ width: 200, height: 200, marginTop: 10 }} />}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, marginBottom: 50 }}>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name='close' color='grey' size={70} containerStyle={{ marginLeft: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => RecipeService.deleteItem(selectedRecipe.name, selectedRecipe.imageName, toggleModalWithRefresh)}>
            <Icon name='delete' color='grey' size={70} />
          </TouchableOpacity>
          <TouchableOpacity onPress={saveImage}>
            <Icon name='done' color='green' size={70} containerStyle={{ marginRight: 20 }} />
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