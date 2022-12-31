import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, Button, TextInput } from 'react-native';
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
  
        <Modal 
            isVisible={isModalVisible} 
            backdropOpacity={0.90}
            animationIn="fadeIn" animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            style={{alignItems:'center', justifyContent:'center'}}>
          <View style={{ flex: 1 }}>
            <Text style={{color:'white', margin:50, fontSize:25}}>Új recept hozzáadása</Text>
  
            <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'white', fontSize:17, padding:2, marginRight:10}}>Név:</Text>
                <TextInput placeholder="Írj ide.." width='78%' backgroundColor='white' style={{paddingLeft:10, fontSize:17}}/>
            </View>
            
            <View style={{flexDirection:'row', margin:10}}>
                <Text style={{color:'white', fontSize:17, padding:2, marginRight:10}}>Cimkék:</Text>
                <TextInput placeholder="Vesszővel elválasztva.." width='69%' backgroundColor='white' style={{paddingLeft:10, fontSize:17}}/>
            </View>


            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:15}}>
                <TouchableOpacity onPress={toggleModal}>
                    <Text style={{color:'white',marginLeft:50, fontSize:20, backgroundColor:'rgba(120,184,192,1)', padding:10, paddingLeft:20, paddingRight:20, borderRadius:10}}>Mégse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleModal}>
                    <Text style={{color:'white', marginRight:50, fontSize:20, backgroundColor:'rgba(120,184,192,1)', padding:10, paddingLeft:20, paddingRight:20, borderRadius:10}}>Mentés</Text>
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