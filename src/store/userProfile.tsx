import { create } from "zustand";
import { persist } from "zustand/middleware";
import { indexedDBStorage } from "../database/indexedDB";
import profile from "../assets/profile-user.png";
export interface UserProfile {
  name: string;
  bio: string;
  image: string;
}

interface UserProfileStore {
  userProfile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const useProfileStore = create<UserProfileStore>()(
  persist(
    (set) => ({
      userProfile: {
        name: "Anonymous",
        bio: "No bio available",
        image: profile,
      },
      updateProfile: (updates) =>
        set((state) => ({
          userProfile: { ...state.userProfile, ...updates },
        })),
    }),
    {
      name: "user-profile",
      storage: indexedDBStorage,
    }
  )
);

export default useProfileStore;
