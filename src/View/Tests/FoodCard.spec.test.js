import * as React from 'react'
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import FoodCard from '../FoodCard.js';

class FakeRecipeService{
  isLoaded = false;
  
  getImageUrl(imageName){
    this.isLoaded = true;
    return imageName;
  }
}

test('Recipe Name is visible', async () => {
  var page = await render(<FoodCard recipeService={FakeRecipeService} imageUrl="imageUrl" tags={"Tag"} name={"Recipe Name"} imageName={"Image Name"}/>);

  var recipeName = page.queryAllByTestId('RecipeName');
  
  expect(recipeName.length).toEqual(1);
  expect(recipeName[0].props.text).toEqual("Recipe Name");
});

test('Image is loaded when empty ', async () => {
  var fakeRecipe = new FakeRecipeService;
  await waitFor( async () => render(<FoodCard recipeService={fakeRecipe} tags={"Tag"} name={"Recipe Name"} imageName={"Image Name"}/>));

  expect(fakeRecipe.isLoaded).toEqual(true);
});