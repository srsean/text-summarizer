import { TextSummary } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Create the Types for the state
interface HistoryState {
  textSummaries: TextSummary[];
  selectedTextSummary: TextSummary | null;
  mode: "edit" | "delete" | null;
  setTextSummaries: (textSummaries: TextSummary[]) => void;
  setSelectedTextSummary: (textSummary: TextSummary | null) => void;
  setMode: (mode: "edit" | "delete" | null) => void;
}

const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      // initial state
      textSummaries: [],
      selectedTextSummary: null,
      mode: null,
      // actions
      setTextSummaries: (textSummaries) => set({ textSummaries }),
      setSelectedTextSummary: (selectedTextSummary) => set({ selectedTextSummary }),
      setMode: (mode) => set({ mode }),
    }),
    {
      name: "history-store",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useHistoryStore;
