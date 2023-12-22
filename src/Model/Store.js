import create from 'zustand';

const useStore = create((set) => ({
  searchedTag: '',
  needRefresh: false,
  modifyTag: (tag) => set((state) => ({searchedTag: tag})),
  modifyNeedRefresh: (refresh) => set((state) => ({needRefresh: refresh})),

  selectedRecipe: null,
  modifySelectedRecipe: (recipe) => set((state) => ({selectedRecipe: recipe})),
}));

export default useStore;
