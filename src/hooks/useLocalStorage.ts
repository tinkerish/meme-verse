export const useLocalStorage = (key = "", value) => {
  const setItem = (value = "") => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log((error as Error)?.message);
    }
  };
  if (value) {
    setItem(value);
  }
  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log((error as Error)?.message);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log((error as Error)?.message);
    }
  };

  return { setItem, getItem, removeItem };
};
