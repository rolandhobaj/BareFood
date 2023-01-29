import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import FoodCard from '../FoodCard.js';

class FakeRecipeService{
  getImageUrl(imageName){
    return imageName;
  }
}

test('Recipe Name is visible', async () => {
  var page = await render(<FoodCard recipeService={FakeRecipeService} imageUrl="imageUrl" tags={"Tag"} name={"Recipe Name"} imageName={"Image Name"}/>);

  var recipeName = page.queryAllByTestId('RecipeName');
  
  expect(recipeName.length).toEqual(1);
  expect(recipeName[0].props.text).toEqual("Recipe Name");
});