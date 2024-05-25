import { create } from "zustand";
import { LoginEntity } from "@/app/auth/login/types/login.types";
import { axiosInstace } from "@/common/utils/axiosInstance";
import { NetInfoCellularGeneration } from "@react-native-community/netinfo";

type SessionState = {
  id: number;
  isLoggedIn: boolean;
  isExpired: boolean;
  setId: (id: number) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  sessionTimeout: NodeJS.Timeout | null;
};

export const useUserSession = create<SessionState>((set) => ({
  id: 0,
  isLoggedIn: false,
  isExpired: false,
  sessionTimeout: null,
  setId: (id) => set({ id }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
