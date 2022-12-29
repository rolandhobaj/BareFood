import create from 'zustand'

const useStore = create((set) => ({
    searchedTag: '',
    modifyTag: (tag) => set((state) => ({ searchedTag: tag })),
  }))

export default useStore;