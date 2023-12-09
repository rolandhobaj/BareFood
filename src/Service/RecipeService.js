import Recipe from '../Model/Recipe';
import app from '../Service/FirebaseApp';

import {getFirestore} from 'firebase/firestore';
import {getStorage, ref, getDownloadURL, uploadBytes, deleteObject} from 'firebase/storage';
import {collection, getDocs, setDoc, doc, deleteDoc} from 'firebase/firestore';

const db = getFirestore(app);
const storage = getStorage(app);

export default class RecipeService {
  static async addRecipe(recipe, imagePath, whenDone) {
    await setDoc(doc(db, 'recipes', recipe.name), {
      name: recipe.name,
      tags: recipe.tags,
      imageName: recipe.imageName,
    });

    await this.uploadFile(imagePath, recipe.imageName);
    whenDone(true);
  }

  static async uploadFile(filepath, filename) {
    const blob = await this.urlToBlob(filepath);
    await uploadBytes(ref(storage, filename), blob);
  }

  static urlToBlob(url) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob'; // convert type
      xhr.send();
    });
  }

  static async deleteItem(recipeName, whenDone) {
    const allRecipes = await this.getAllRecipe();
    if (allRecipes.length == 1) {
      return;
    }
    const selectedIdList = allRecipes.filter((x) => x.name == recipeName);
    if (selectedIdList.length == 0) {
      return;
    }

    const selectedRecipe = selectedIdList[0];
    await deleteDoc(doc(db, 'recipes', selectedRecipe.id));

    if (!deleteObject || selectedRecipe.imageName == '' || selectedRecipe.imageName == undefined) {
      whenDone(true);
      return;
    }
    const desertRef = ref(storage, selectedRecipe.imageName);
    await deleteObject(desertRef);
    whenDone(true);
  }

  static async getAllRecipe() {
    let firstUrl = await this.getImageUrl("dd3354a2-dcd6-4225-b66b-1fd4a9faca34.jpeg");
    let secondUrl = await this.getImageUrl("ananászoscsirke.jpg");
    const recipeList = [
      {
        id: "Alfredo tészta",
        imageName: firstUrl,
        name: "Alfredotésör Alfredo tészta",
        tags: ["Főétel"],
      },
      
      {
        id: "Ananászoscsirke",
        imageName: secondUrl,
        name: "Ananászos",
        tags: ["Főétel"],
      },
    ];
    /*const querySnapshot = await getDocs(collection(db, 'recipes'));

    const imageUrlPromises = [];

    querySnapshot.forEach((doc) => {
      // Push the promise returned by getImageUrl into the array
      imageUrlPromises.push(this.getImageUrl(doc.data().imageName).then(imageUrl => {
        return new Recipe(
          doc.id,
          doc.data().name,
          !Array.isArray(doc.data().tags) ? doc.data().tags.split(',').map((x) => x.trim()) : doc.data().tags,
          imageUrl
        );
      }));
    });
  
    // Wait for all promises to resolve
    const recipeList = await Promise.all(imageUrlPromises);
*/
    return recipeList;
  }

  static async getImageUrl(name) {
    if (name == undefined || name=='') {
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
