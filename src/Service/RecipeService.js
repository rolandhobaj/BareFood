import Recipe from '../Model/Recipe'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"; 

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
const db = getFirestore(app);

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
}