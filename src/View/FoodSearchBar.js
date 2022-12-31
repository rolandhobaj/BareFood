import { SearchBar } from 'react-native-elements';
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import useStore from '../Model/Store'

export default function FoodSearchBar(){
  const [search, setSearch] = useState(0);
  const modifyTag = useStore(s => s.modifyTag);

  const updateTag = function(tag){
    setSearch(tag);
    modifyTag(tag);
  }

    return (
      <View>
        <SearchBar
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.iconStyle}
          placeholderTextColor='white'
          placeholder="Írj ide..."
          searchIcon={{color:'white'}}
          onChangeText={updateTag}
          value={search}/>
          <View style={styles.quickSearchContainer}>
          <TouchableOpacity style={styles.quickSearch} onPress={() => updateTag("Leves")}>
            <Text style={styles.innerText}>Leves</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearch} onPress={() => updateTag("Főétel")}>
            <Text style={styles.innerText}>Főétel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearch} onPress={() => updateTag("Köret")}>
            <Text style={styles.innerText}>Köret</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderTopWidth: 0,
      borderBottomColor: 0,
      marginTop:25,
    },
    inputContainer: {
      backgroundColor: 'rgba(18,57,6,0.35)'
    },
    iconStyle: {
      color: '#ffffff',
    },
    quickSearchContainer: {
      flexDirection: 'row',
      marginLeft:8,
      marginRight:8,
      height:35
    },
    quickSearch: {
      alignItems: "center",
      backgroundColor: 'rgba(18,57,6,0.35)',
      padding: 5,
      margin:2,
      borderRadius:360,
      flex:3
    },
    innerText: {
      color: 'white'
    }
  });