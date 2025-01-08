import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Create the Types for the state
interface HomeState {
  showMultiText: boolean;
  inputWords: string;
  inputWordsCount: number;
  inputCharCount: number;
  outputWords: string;
  outputWordsCount: number;
  outputCharCount: number;
  setMultiText: (show: boolean) => void;
  setInputWords: (words: string) => void;
  setOutputWords: (words: string) => void;
}

const useHomeStore = create<HomeState>()(
  persist(
    (set) => ({
      // initial state
      showMultiText: false,
      inputWords: "",
      inputWordsCount: 0,
      inputCharCount: 0,
      outputWords: "",
      outputWordsCount: 0,
      outputCharCount: 0,
      // actions
      setMultiText: (show) => {
        set({ showMultiText: show });
      },
      setInputWords: (words) => {
        set({ showMultiText: words.length > 0 });
        set({ inputWords: words });
        set({ inputWordsCount: words.length > 0 ? words.split(" ").length : 0 });
        set({ inputCharCount: words.length });
      },
      setOutputWords: (words) => {
        set({ outputWords: words });
        set({ outputWordsCount: words.length > 0 ? words.split(" ").length : 0 });
        set({ outputCharCount: words.length });
      },
    }),
    {
      name: "home-storage",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useHomeStore;
