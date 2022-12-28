import { SearchBar } from 'react-native-elements';
import React from 'react';
import { StyleSheet } from 'react-native';


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
      <SearchBar
        containerStyle={styles.container}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.iconStyle}
        placeholderTextColor='white'
        placeholder="Type Here..."
        searchIcon={{color:'white'}}
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'rgba(0,0,0,0.0)',
      borderTopWidth: 0,
      borderBottomColor: 0
    },
    inputContainer: {
      backgroundColor: 'rgba(18,57,60,0.35)'
    },
    iconStyle: {
      color: '#ffffff',
    },
  });