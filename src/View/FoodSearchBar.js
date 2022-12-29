import { SearchBar } from 'react-native-elements';
import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class FoodSearchBar extends React.Component {
  state = {
    search: '',
  };

  updateSearch = (search) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.iconStyle}
          placeholderTextColor='white'
          placeholder="Írj ide..."
          searchIcon={{color:'white'}}
          onChangeText={this.updateSearch}
          value={search}/>
          <View style={styles.quickSearchContainer}>
          <TouchableOpacity style={styles.quickSearch} onPress={() => this.updateSearch("Ebéd")}>
            <Text style={styles.innerText}>Ebéd</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearch} onPress={() => this.updateSearch("Vacsi")}>
            <Text style={styles.innerText}>Vacsi</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickSearch} onPress={() => this.updateSearch("Desszert")}>
            <Text style={styles.innerText}>Desszert</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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