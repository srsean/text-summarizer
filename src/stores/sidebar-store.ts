import { User } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
// Create the Types for the state
interface SidebarState {
  userData: User | null;
  textSummaryHistoryCount: number;
  setUserData: (userData: User | null) => void;
  setTextSummaryHistoryCount: (count: number) => void;
}

const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      // initial state
      userData: null,
      textSummaryHistoryCount: 0,
      // actions
      setUserData: (userData) => set({ userData }),
      setTextSummaryHistoryCount: (count) => set({ textSummaryHistoryCount: count }),
    }),
    {
      name: "sidebar-store",
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSidebarStore;
