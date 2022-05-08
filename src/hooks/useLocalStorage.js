import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialState) => {
  const get = () => {
    const storage = localStorage.getItem(key);
    if (storage) {
      return JSON.parse(storage).value;
    }
    return initialState;
  };
  const [value, setValue] = useState(get());

  // ? subscribing to any changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify({ value }));
  }, [value, key]);
  return [value, setValue];
};
