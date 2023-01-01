import Recipe from '../Model/Recipe'
import app from '../Service/FirebaseApp'

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore"; 

const db = getFirestore(app);
const storage = getStorage(app);

export default class RecipeService{

    /*static async writeRecipes(){
        const querySnapshot = await getDocs(collection(db, "recipes"));
        querySnapshot.forEach((doc) => {
            let recipe = new Recipe(doc.data().name, doc.data().tags.split(',').map(x => x.trim()), doc.data().imageName)
            console.log(recipe);
         });
    }*/

    static getAllRecipe(){
        return [
            new Recipe("Alma", ["Köret"])
            ];
    }

    static getImageUrl(name, whenDone){
        getDownloadURL(ref(storage, name))
        .then((url) => {
            whenDone(url);
        })
        .catch((error) => {
        console.log(error);
        });
    }
}