import create from 'zustand';
import Recipe from '../Model/Recipe'

const useStore = create((set) => ({
  searchedTag: '',
  needRefresh: false,
  modifyTag: (tag) => set((state) => ({ searchedTag: tag })),
  modifyNeedRefresh: (refresh) => set((state) => ({ needRefresh: refresh })),

  selectedRecipe: new Recipe(),
  modifySelectedRecipe: (recipe) => set((state) => ({ selectedRecipe: recipe })),
  modifySelectedRecipeUpdater: (updater) => set((state) => ({ selectedRecipe: updater(state.selectedRecipe) })),

  selectedRecipeOriginalName: '',
  modifySelectedRecipeOriginalName: (name) => set((state) => ({ selectedRecipeOriginalName: name })),
}));

export default useStore;
