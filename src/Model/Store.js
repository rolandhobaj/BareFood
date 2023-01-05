import create from 'zustand'

const useStore = create((set) => ({
    searchedTag: '',
    needRefresh: true,
    modifyTag: (tag) => set((state) => ({ searchedTag: tag })),
    modifyNeedRefresh: (refresh) => set((state) => ({ needRefresh: refresh })),
  }))

export default useStore;