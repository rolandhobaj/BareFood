import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button } from 'react-native';
import Modal from "react-native-modal";
import { Icon } from '@rneui/themed';


export default function NewRecipeModal(){
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };
  
    return (
      <View>
       <TouchableOpacity
          onPress={toggleModal}
          style={styles.roundButton}>
             <Icon name='add' color='white' size={40} containerStyle={{margin:5}}
        />
  
        <Modal isVisible={isModalVisible}>
          <View style={{ flex: 1 }}>
            <Text>Hello!</Text>
  
            <Button title="Hide modal" onPress={toggleModal} />
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