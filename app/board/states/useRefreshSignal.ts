import { create } from "zustand";

type RefreshState = {
  onRefresh: boolean;
  setOnRefresh: (onRefresh: boolean) => void;
};

export const useRefreshSignal = create<RefreshState>((set) => ({
  onRefresh: false,
  setOnRefresh: (onRefresh) => set({ onRefresh }),
}));
