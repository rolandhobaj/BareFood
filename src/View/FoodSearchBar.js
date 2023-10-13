import React, { useState } from 'react';
import { View } from 'react-native';
import useStore from '../Model/Store'
import SearchableDropdown from 'react-native-searchable-dropdown';

var items = [
  {
    id: 0,
    name: 'Minden',
  },
  {
    id: 1,
    name: 'Leves',
  },
  {
    id: 2,
    name: 'Főétel',
  },
  {
    id: 3,
    name: 'Regnyuzsi',
  },
  {
    id: 4,
    name: 'Köret',
  },
  {
    id: 5,
    name: 'Desszert',
  },
];

export default function FoodSearchBar(){
  const [search, setSearch] = useState("");
  const [all, setAll] = useState(false);
  const modifyTag = useStore(s => s.modifyTag);

  const updateTag = function(tag){
    modifyTag(tag);
  }

  if (search === "") {
    if (all){
      placeholderText = 'Minden';
    } else{
      placeholderText = 'Írj be ide valamit';
    }
  } else {
    placeholderText = search;
  }

    return (
      <View>
        <SearchableDropdown
            onItemSelect={(item) => {
              let searchedText = item.name;
              let all = false;
              if (item.id === 0){                
                searchedText=""
                all = true;
              }
              setAll(all);
              setSearch(searchedText);
              updateTag(searchedText);
            }}
            containerStyle={{ padding: 5, backgroundColor: 'rgba(18,57,6,0.35)', margin: 10 }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: 'rgba(18,57,6,0.35)',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: 'white' }}
            itemsContainerStyle={{ maxHeight: 100 }}
            items={items}
            resetValue={false}
            textInputProps={
              {
                placeholder: placeholderText,
                placeholderTextColor: 'white',
                color: 'white',
                underlineColorAndroid: "transparent",
                style: {
                    paddingLeft: 9,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    height: 40,
                    borderRadius: 5,
                },
                onTextChange: text => updateTag(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />
      </View>
    );
}