import { Text, Image, View } from 'react-native';
import { StyleSheet} from 'react-native';
import { useState, useEffect } from 'react';

import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDY8QMgac_DPnIA3T6lYWPqXq6LesUyWnU",
  authDomain: "bearfood-a9597.firebaseapp.com",
  databaseURL: "https://bearfood-a9597-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bearfood-a9597",
  storageBucket: "bearfood-a9597.appspot.com",
  messagingSenderId: "454930290059",
  appId: "1:454930290059:web:287566ce452fa6f7c50b8e"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export default function FoodCard(props){
  const [imageUrl, setImageUrl] = useState(undefined);

  useEffect(() => {
    getDownloadURL(ref(storage, 'pityi.jpg'))
    .then((url) => {
      setImageUrl(url);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  return (
      <View style={styles.container}>
        <Image source={{uri: imageUrl}} style={styles.image} />
        <Text style={styles.text}>
          {props.name}
        </Text>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(18,57,6,0.35)',
    flex: 1,
    textAlignVertical: 'center',
    borderRadius:40,
    margin:10,
    padding:10,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: null, 
    height: 130, 
  },
  text: {
    marginTop:10,
    fontSize: 16, 
    
    fontWeight: 'bold', 
    color: '#ffffff',
    textAlign: 'center',
  }
});