import type { TextSummaryStyle, TextSummaryTone } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SummaryTone = Lowercase<TextSummaryTone>;
export type SummaryStyle = Lowercase<TextSummaryStyle>;

// Create the Types for the state
interface HomeState {
  showMultiText: boolean;
  inputWords: string;
  inputWordsCount: number;
  inputCharCount: number;
  outputWords: string;
  outputWordsCount: number;
  outputCharCount: number;
  tone: SummaryTone;
  style: SummaryStyle;
  // Settings that produced the summary currently on screen.
  outputTone: SummaryTone | null;
  outputStyle: SummaryStyle | null;
  setMultiText: (show: boolean) => void;
  setInputWords: (words: string) => void;
  setOutputWords: (words: string) => void;
  setTone: (tone: SummaryTone) => void;
  setStyle: (style: SummaryStyle) => void;
  setOutputSettings: (tone: SummaryTone, style: SummaryStyle) => void;
  resetSettings: () => void;
}

const DEFAULT_TONE: SummaryTone = "formal";
const DEFAULT_STYLE: SummaryStyle = "concise";

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
      tone: DEFAULT_TONE,
      style: DEFAULT_STYLE,
      outputTone: null,
      outputStyle: null,
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
      setTone: (tone) => set({ tone }),
      setStyle: (style) => set({ style }),
      setOutputSettings: (tone, style) =>
        set({ outputTone: tone, outputStyle: style }),
      resetSettings: () =>
        set({
          tone: DEFAULT_TONE,
          style: DEFAULT_STYLE,
          outputTone: null,
          outputStyle: null,
        }),
    }),
    {
      name: "home-storage",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useHomeStore;
