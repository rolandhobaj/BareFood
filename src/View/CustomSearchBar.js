import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; // or any other icon library you prefer

const CustomSearchBar = ({ value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange('');
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Írj be valamit..."
        placeholderTextColor='white'
        borderBottomColor='white'
        value={value}
        inputStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        leftIcon={<Icon name="search" color='white' type="font-awesome" />}
        rightIcon={isFocused || value ? <FontAwesome name="times" color='white' size={24} onPress={handleClear} /> : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:10,
    marginHorizontal: 10,
    backgroundColor: 'rgba(18,57,6,0.35)',
    height:50
  },
  inputContainer: {
    borderBottomWidth: 0, // Change the color of the line here
  },
  input: {
    color: 'white',
    paddingBottom: -200
  },
});

export default CustomSearchBar;