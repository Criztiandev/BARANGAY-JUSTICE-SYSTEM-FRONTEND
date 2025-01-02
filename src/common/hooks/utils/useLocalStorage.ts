/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

type SetItemFunction = <T>(value: T) => void;
type GetItemFunction = () => string | null;
type RemoveItemFunction = () => void;
type UpdateItemFunction = (updater: (prevValue: string) => string) => void;

interface UseLocalStorageReturn {
  setItem: SetItemFunction;
  getItem: GetItemFunction;
  removeItem: RemoveItemFunction;
  updateItem: UpdateItemFunction;
}

const useLocalStorage = (key: string): UseLocalStorageReturn => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  });

  const setItem: SetItemFunction = useCallback(
    (value: any) => {
      try {
        window.localStorage.setItem(key, value);
        setStoredValue(value);
      } catch (error) {
        console.error("Error writing to localStorage:", error);
      }
    },
    [key]
  );

  const getItem: GetItemFunction = useCallback(() => {
    return storedValue;
  }, [storedValue]);

  const removeItem: RemoveItemFunction = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(null);
    } catch (error) {
      console.error("Error removing item from localStorage:", error);
    }
  }, [key]);

  const updateItem: UpdateItemFunction = useCallback(
    (updater: (prevValue: string) => string) => {
      try {
        const currentValue = window.localStorage.getItem(key);
        if (currentValue !== null) {
          const newValue = updater(currentValue);
          window.localStorage.setItem(key, newValue);
          setStoredValue(newValue);
        }
      } catch (error) {
        console.error("Error updating item in localStorage:", error);
      }
    },
    [key]
  );

  return { setItem, getItem, removeItem, updateItem };
};

export default useLocalStorage;
