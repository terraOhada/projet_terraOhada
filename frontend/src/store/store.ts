import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Définition des types pour l'utilisateur
interface User {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  role: "ADMIN" | "USER" | "SUPER_ADMIN";
  isAccountVerified: boolean;
  email: string;
  createdAt: Date; // Date de création du compte
  updatedAt: Date; // Date de la dernière mise à jour du compte
}

interface UserStoreProps {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
}

export const userStore = create<UserStoreProps>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);
