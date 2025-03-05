import { create } from "zustand";
import { persist } from "zustand/middleware";
import { indexedDBStorage } from "../database/indexedDB";

export interface Meme {
  id: string;
  name: string;
  url: string;
  timestamp: number;
  likes: number;
  comments: string[];
  category: "New" | "Classic";
}

interface MemeStore {
  memes: Meme[];
  userMemes: Meme[];
  mergedMemes: Meme[];
  lastFetchedAt: number;
  likedMemes: Meme[];
  fetchAndMergeMemes: () => Promise<void>;
  getMemes: () => Promise<void>;
  addUserMeme: (meme: Omit<Meme, "timestamp">) => void;
  addLikes: (id: string) => void;
  addComments: (id: string, comment: string) => void;
}

const STALE_TIME = 10 * 60 * 1000; // 10 minutes

const useMemeStore = create<MemeStore>()(
  persist(
    (set, get) => ({
      memes: [],
      userMemes: [],
      mergedMemes: [],
      likedMemes: [],
      lastFetchedAt: 0,
      fetchAndMergeMemes: async () => {
        const storedMemes = get().memes;
        const response = await fetch("https://api.imgflip.com/get_memes");
        const fetchedMemes: Meme[] = await response.json();

        let lastTimestamp = storedMemes.length
          ? storedMemes[0].timestamp
          : Date.now();
        const updatedMemes: Meme[] = fetchedMemes.data.memes.map((meme) => {
          const existingMeme = storedMemes.find((m) => m.id === meme.id);
          const currTimeStamp = lastTimestamp + 24 * 60 * 60 * 1000;
          lastTimestamp = currTimeStamp;
          return {
            id: meme.id,
            name: meme.name,
            url: meme.url,
            timestamp: existingMeme?.timestamp || currTimeStamp,
            likes: existingMeme?.likes || Math.floor(Math.random() * 100 + 1),
            comments: existingMeme ? [...existingMeme.comments] : [],
            category:
              existingMeme?.category ||
              (Math.random() < 0.5 ? "New" : "Classic"),
          };
        });
        const sortedMemes = updatedMemes.sort(
          (a, b) => b.timestamp - a.timestamp
        );
        set({ memes: sortedMemes, lastFetchedAt: Date.now() });
      },

      getMemes: async () => {
        const { lastFetchedAt, fetchAndMergeMemes } = get();
        const currentTime = Date.now();

        if (currentTime - lastFetchedAt > STALE_TIME) {
          await fetchAndMergeMemes();
          const combinedMemes = [...get().memes, ...get().userMemes].sort(
            (a, b) => b.timestamp - a.timestamp
          );
          set({ mergedMemes: combinedMemes });
        }
      },

      addUserMeme: (meme) => {
        const storedMemes = get().mergedMemes;
        const lastTimestamp = storedMemes.length
          ? storedMemes[0].timestamp
          : Date.now();
        set((state) => ({
          userMemes: [
            { ...meme, timestamp: lastTimestamp + 24 * 60 * 60 * 1000 },
            ...state.userMemes,
          ],
          mergedMemes: [
            { ...meme, timestamp: lastTimestamp + 24 * 60 * 60 * 1000 },
            ...state.mergedMemes,
          ],
        }));
      },
      addLikes: (id) => {
        const storedMemes = get().mergedMemes;
        const userMemes = get().userMemes;
        const memes = get().memes;
        const likedMemes = get().likedMemes;
        const givenMemeIndex = storedMemes.findIndex((meme) => meme.id === id);
        const likedMemeIndex = likedMemes.findIndex((meme) => meme.id === id);
        const userMemeIndex = userMemes.findIndex((meme) => meme.id === id);
        const memeIndex = memes.findIndex((meme) => meme.id === id);
        if (givenMemeIndex !== -1) {
          const updatedMeme = {
            ...storedMemes[givenMemeIndex],
          };
          updatedMeme.likes = updatedMeme.likes + 1;
          const updatedMemes = [...storedMemes];
          updatedMemes.splice(givenMemeIndex, 1, updatedMeme);
          set({ mergedMemes: updatedMemes });
          if (likedMemeIndex === -1) {
            likedMemes.push(updatedMeme);
          }
        }

        // if (userMemeIndex !== -1) {
        //   const updatedMeme = userMemes[userMemeIndex];
        //   updatedMeme.likes = updatedMeme.likes + 1;
        //   const updatedMemes = userMemes;
        //   updatedMemes.splice(userMemeIndex, 1, updatedMeme);
        //   set({ userMemes: updatedMemes });
        // }
        // if (memeIndex !== -1) {
        //   const updatedMeme = memes[memeIndex];
        //   updatedMeme.likes = updatedMeme.likes + 1;
        //   const updatedMemes = memes;
        //   updatedMemes.splice(memeIndex, 1, updatedMeme);
        //   set({ memes: updatedMemes });
        // }
      },
      addComments: (id, comment) => {
        const storedMemes = get().mergedMemes;
        const userMemes = get().userMemes;
        const memes = get().memes;
        const givenMemeIndex = storedMemes.findIndex((meme) => meme.id === id);
        const userMemeIndex = userMemes.findIndex((meme) => meme.id === id);
        const memeIndex = memes.findIndex((meme) => meme.id === id);
        if (givenMemeIndex !== -1) {
          const updatedMeme = {
            ...storedMemes[givenMemeIndex],
          };
          updatedMeme.comments.push(comment);
          const updatedMemes = [...storedMemes];
          updatedMemes.splice(givenMemeIndex, 1, updatedMeme);
          set({ mergedMemes: updatedMemes });
        }

        // if (userMemeIndex !== -1) {
        //   const updatedMeme = userMemes[userMemeIndex];
        //   updatedMeme.comments.push(comment);
        //   const updatedMemes = userMemes;
        //   updatedMemes.splice(userMemeIndex, 1, updatedMeme);
        //   set({ userMemes: updatedMemes });
        // }
        // if (memeIndex !== -1) {
        //   const updatedMeme = memes[memeIndex];
        //   updatedMeme.comments.push(comment);
        //   const updatedMemes = memes;
        //   updatedMemes.splice(memeIndex, 1, updatedMeme);
        //   set({ memes: updatedMemes });
        // }
      },
    }),

    {
      name: "meme-store",
      storage: indexedDBStorage,
    }
  )
);

export default useMemeStore;
