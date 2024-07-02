import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';

interface BagContextType {
  bag: Sneakers[];
  addToBag: (item: Sneakers) => void;
  removeFromBag: (id: number) => void;
  resetBag: () => void;
  totalBagItems: number;
}

const BagContext = createContext<BagContextType>({
  bag: [],
  addToBag: () => {},
  removeFromBag: () => {},
  resetBag: () => {},
  totalBagItems: 0,
});

export const useBag = () => useContext(BagContext);

const STORAGE_KEY = "BAG_ITEMS";

const loadJSON = (key: string): Sneakers[] | null => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const saveJSON = (key: string, data: Sneakers[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const BagProvider: React.FC = ({ children }: {children : React.ReactNode}) => {
  const [bag, setBag] = useState<Sneakers[]>([]);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      const localItems = loadJSON(STORAGE_KEY);
      if (localItems) setBag(localItems);
      isInitialized.current = true;
    } else {
      saveJSON(STORAGE_KEY, bag);
    }
  }, [bag]);

  const addToBag = useCallback((item: Sneakers) => {
    setBag(prevBag => [...prevBag, item]);
  }, []);

  const removeFromBag = useCallback((id: number) => {
    setBag(prevBag => prevBag.filter(item => item.id !== id));
  }, []);

  const resetBag = useCallback(() => {
    setBag([]);
  }, []);

  const totalBagItems = bag.length;

  const contextValue = {
    bag,
    addToBag,
    removeFromBag,
    resetBag,
    totalBagItems,
  };

  return (
    <BagContext.Provider value={contextValue}>
      {children}
    </BagContext.Provider>
  );
};

export default BagProvider;