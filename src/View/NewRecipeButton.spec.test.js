import * as React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import NewRecipeButton from './NewRecipeButton';

test('modal is not visible by default', async () => {
  var page = render(<NewRecipeButton/>);

  expect(page.queryAllByTestId('recipeModal').length).toEqual(0);
});

test('when pressing button, modal is visible', async () => {
  var page = render(<NewRecipeButton/>);

  fireEvent.press(page.getByTestId('showModalButton'));

  expect(page.queryAllByTestId('recipeModal').length).toEqual(1);
});