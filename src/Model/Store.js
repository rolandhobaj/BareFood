import create from 'zustand'

const useStore = create((set) => ({
    searchedTag: '',
    needRefresh: true,
    isRecipeModalVisible: false,
    modifyTag: (tag) => set((state) => ({ searchedTag: tag })),
    modifyNeedRefresh: (refresh) => set((state) => ({ needRefresh: refresh })),
    modifyRecipeModalVisible: (visible) => set((state) => ({ isRecipeModalVisible: visible })),
  }))

export default useStore;