import { openDB } from "idb";

const dbPromise = openDB("recipe-form-db", 1, {
  upgrade(db) {
    db.createObjectStore("formData");
  },
});

export const indexedDBStorage = {
  getItem: async (name) => {
    const db = await dbPromise;
    const value = await db.get("formData", name);
    return value ? JSON.parse(value) : null;
  },
  setItem: async (name, value) => {
    const db = await dbPromise;
    await db.put("formData", JSON.stringify(value), name);
  },
  removeItem: async (name) => {
    const db = await dbPromise;
    await db.delete("formData", name);
  },
};
