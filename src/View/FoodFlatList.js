import { React, useState } from 'react'
import { FlatList, View, Text } from 'react-native';

import FoodCard from './FoodCard'
import RecipeService from '../Service/RecipeService'
import useStore from '../Model/Store'
import { async } from '@firebase/util';


function removeSpecialCharacters(text) {
    text = text.replace('Á', 'A');
    text = text.replace('É', 'E');
    text = text.replace('Í', 'I');
    text = text.replace('Ó', 'O');
    text = text.replace('Ö', 'O');
    text = text.replace('Ő', 'O');
    text = text.replace('Ú', 'U');
    text = text.replace('Ü', 'U');
    text = text.replace('Ű', 'U');
 
    return text;
  }

function filter(data, tag){
    let searchedTag = removeSpecialCharacters(tag.toUpperCase());
    return data.filter(r => {
        let recipeName = removeSpecialCharacters(r.name.toUpperCase());
        if (recipeName.includes(searchedTag)){
            return true
        }

        for (let i = 0; i < r.tags.length; i++) {
            let recipeTag = removeSpecialCharacters(r.tags[i].toUpperCase());
            if (recipeTag.includes(searchedTag)){
                return true;
            }
        }

        return false;
    });
}

async function downloadList(whenDone, whenDoneUrl){
    let data = (await RecipeService.getAllRecipe()).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase());
    whenDone(data);
    let imageUrls = []
    for (let i = 0; i < data.length; i++) {
        let url = await RecipeService.getImageUrl(data[i].imageName);
        imageUrls.push({
            imageName: data[i].imageName,
            imageUrl: url
        });
      }

    whenDoneUrl(imageUrls);

    return imageUrls;
}

function getMappedRecipes(data, tag){
    if (data.length == 0){
        return [];
    }

    if (tag !== ''){
       data =  filter(data, tag);
    }

    const chunkSize = 2;
    let recipes = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        if (chunk.length >= 2){
            recipes.push({
                firstKey:{name: chunk[0].name, imageName: chunk[0].imageName, tags:chunk[0].tags},
                secondKey:{name: chunk[1].name, imageName: chunk[1].imageName, tags:chunk[1].tags}
            })
        } else {
            recipes.push({
                firstKey:{name: chunk[0].name, imageName: chunk[0].imageName, tags:chunk[0].tags},
                secondKey:null
            })
        }
    }

    return recipes;
};

function getImageUrl(imageName, imageUrls){
    if (imageUrls.length == 0){
        return "";
    }

    var list = imageUrls.filter(x => x.imageName == imageName);
    if (list.length == 0){
        return "";
    }
    return list[0].imageUrl;
}

export default function FoodFlatList() {
        const [recipes, setRecipe] = useState([]);
        const [imageUrls, setImageUrls] = useState([]);
        const searchedTag = useStore((state) => state.searchedTag)
        const needRefresh = useStore((state) => state.needRefresh)
        const modifyNeedRefresh = useStore((state) => state.modifyNeedRefresh)

        if (needRefresh){
            downloadList(setRecipe, setImageUrls);
            modifyNeedRefresh(false);
        }
        
        return (
            <FlatList
                data={getMappedRecipes(recipes, searchedTag)}
                renderItem={({ item }) =>
                    <View style={{ flexDirection: 'row' }}>
                        <FoodCard style={{flex:2}} tags={item.firstKey.tags} name={item.firstKey.name} imageName={getImageUrl(item.firstKey.imageName, imageUrls)}/>
                        {item.secondKey!= null ? <FoodCard name={item.secondKey.name} tags={item.firstKey.tags} imageName={getImageUrl(item.secondKey.imageName, imageUrls)}/>: <View style={{width:'50%'}}/> }
                    </View>
                }
          />
        )
};