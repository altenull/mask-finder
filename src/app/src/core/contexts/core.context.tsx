import React, { createContext, ReactNode, useState } from 'react';

export interface CoreContextState {
  isKakaoMapLoaded: boolean;
  loadkakaoMapComplete: () => void;
}

const initialState = {
  isKakaoMapLoaded: false,
  loadkakaoMapComplete: () => {},
};

export const CoreContext = createContext<CoreContextState>(initialState);

export const CoreProvider = ({ children }: { children: ReactNode }) => {
  const [isKakaoMapLoaded, setIsKakaoMapLoaded] = useState(false);

  const loadkakaoMapComplete = () => {
    setIsKakaoMapLoaded(true);
  };

  return (
    <CoreContext.Provider
      value={{
        isKakaoMapLoaded,
        loadkakaoMapComplete,
      }}>
      {children}
    </CoreContext.Provider>
  );
};
