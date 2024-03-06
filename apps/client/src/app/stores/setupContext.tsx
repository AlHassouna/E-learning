import React, { ReactNode } from 'react';

import { createStore, Stores } from './createStore';

export const store = createStore() as Stores;

export const StoreContext = React.createContext(store);

export const useStore = () => {
  return React.useContext(StoreContext);
};

export const StoreProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

