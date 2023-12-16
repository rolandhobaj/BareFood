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

  static async deleteItem(recipeName, imageName, whenDone) {
    await deleteDoc(doc(db, 'recipes', recipeName));

    if (imageName == '') {
      whenDone(true);
      return;
    }
    const desertRef = ref(storage, imageName);
    await deleteObject(desertRef);
    whenDone(true);
  }

  static async getAllRecipe() {
    const querySnapshot = await getDocs(collection(db, 'recipes'));

    const allRecipe = querySnapshot.docs.map(doc => new Recipe(doc.data().name,
    !Array.isArray(doc.data().tags) ? doc.data().tags.split(',').map((x) => x.trim()) : doc.data().tags,
    doc.data().imageName));

    return allRecipe;
  }

  static async getImageUrl(name, whenDone) {
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

    whenDone(downloadedUrl);
    return downloadedUrl;
  }
}
