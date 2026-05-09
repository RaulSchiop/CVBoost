import { create } from "zustand";

export type ProfileType = "FREE" | "Pro" | "Recruiting";

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

   setLocalState: (
      email: string,
      token: string,
      profileType: ProfileType,
      name: string,
   ) => {
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

   getLocalState: () => {
      const state = get();
      return {
         email: state.email,
         token: state.token,
         profileType: state.profileType,
      };
   },
}));
