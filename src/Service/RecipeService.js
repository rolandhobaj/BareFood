import Recipe from '../Model/Recipe'
import app from '../Service/FirebaseApp'
import * as FileSystem from 'expo-file-system';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, getDocs, setDoc, doc } from "firebase/firestore"; 

const db = getFirestore(app);
const storage = getStorage(app);

export default class RecipeService{

    static async addRecipe(recipe, imagePath, whenDone){
        await setDoc(doc(db, "recipes", recipe.name), {
            name: recipe.name,
            tags: recipe.tags,
            imageName: recipe.imageName
          });

        await this.uploadFile(imagePath, recipe.imageName);
        whenDone(true)
    }

    static async uploadFile(filepath, filename){

        let blob = await this.urlToBlob(filepath);
        await uploadBytes(ref(storage, filename), blob);
    }

    static urlToBlob(url) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.onerror = reject;
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.response);
                }
            };
            xhr.open('GET', url);
            xhr.responseType = 'blob'; // convert type
            xhr.send();
        })
      }

    static async getAllRecipe(){
        let recipeList =[];
        const querySnapshot = await getDocs(collection(db, "recipes"));
        querySnapshot.forEach((doc) => {
            let recipe = new Recipe(doc.data().name, doc.data().tags.split(',').map(x => x.trim()), doc.data().imageName)
            recipeList.push(recipe);
         });

        return recipeList;
    }

    static async getImageUrl(name){
        if (name == undefined){
            return '';
        }

        let downloadedUrl = '';
        await getDownloadURL(ref(storage, name))
        .then((url) => {
            downloadedUrl = url;
        })
        .catch((error) => {
        console.log(error);
        });
        return downloadedUrl;
    }
}