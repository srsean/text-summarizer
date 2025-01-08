import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Create the Types for the state
interface SidebarState {
  textSummaryHistoryCount: number;
  setTextSummaryHistoryCount: (count: number) => void;
}

const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // initial state
      textSummaryHistoryCount: 0,
      // actions
      setTextSummaryHistoryCount: (count) => set({ textSummaryHistoryCount: count }),
    }),
    {
      name: "sidebar-store",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSidebarStore;
