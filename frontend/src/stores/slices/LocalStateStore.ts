import { create } from "zustand";

export type ProfileType = "FREE" | "Pro" | "Recruiting";

function isTokenExpired(token: string | null): boolean {
   if (!token) return true;
   try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return Date.now() > payload.exp * 1000;
   } catch {
      return true;
   }
}

interface LocalState {
   email: string | null;
   token: string | null;
   name: string | null;
   profileType: ProfileType;

   setLocalState: (
      email: string,
      token: string,
      profileType: ProfileType,
      name: string,
   ) => void;
   clearLocalState: () => void;
   rehydrate: () => void;
   getLocalState: () => {
      email: string | null;
      token: string | null;
      profileType: ProfileType;
   };
}

export const useLocalStateStore = create<LocalState>((set, get) => ({
   email: null,
   name: null,
   token: null,
   profileType: "FREE",

   setLocalState: (email, token, profileType, name) => {
      set({ email, token, profileType, name });
      localStorage.setItem(
         "LoggedIn",
         JSON.stringify({ email, token, profileType, name }),
      );
   },

   clearLocalState: () => {
      set({ email: null, token: null, profileType: "FREE", name: null });
      localStorage.removeItem("LoggedIn");
   },

   rehydrate: () => {
      const saved = localStorage.getItem("LoggedIn");
      if (!saved) return;

      const { email, token, profileType, name } = JSON.parse(saved);

      if (isTokenExpired(token)) {
         localStorage.removeItem("LoggedIn");
         set({ email: null, token: null, profileType: "FREE", name: null });
         return;
      }

      set({ email, token, profileType, name });
   },

   getLocalState: () => {
      const state = get();
      return {
         email: state.email,
         token: state.token,
         profileType: state.profileType,
      };
   },
}));
