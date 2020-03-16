import React, { createContext, ReactNode, useState } from 'react';

import { MapCoordinates } from '../../map/models/map';

export interface MapContextState {
  kakaoMap: any;
  initKakaoMap: (kakaoMap: any) => void;
  mapCoordinates: MapCoordinates;
  updateMapCoordinates: (mapCoordinates: MapCoordinates) => void;
}

const DEFAULT_KAKAO_MAP: null = null;
const DEFAULT_MAP_COORDINATES: MapCoordinates = {
  latitude: 37.564214,
  longitude: 127.001699,
};

const initialState = {
  kakaoMap: DEFAULT_KAKAO_MAP,
  initKakaoMap: (kakaoMap: any) => {},
  mapCoordinates: DEFAULT_MAP_COORDINATES,
  updateMapCoordinates: (mapCoordinates: MapCoordinates) => {},
};

export const MapContext = createContext<MapContextState>(initialState);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [kakaoMap, setKakaoMap] = useState(DEFAULT_KAKAO_MAP);
  const [mapCoordinates, setMapCoordinates] = useState<MapCoordinates>(DEFAULT_MAP_COORDINATES);

  const initKakaoMap = (kakaoMap: any) => {
    setKakaoMap(kakaoMap);
  };

  const updateMapCoordinates = (mapCoordinates: MapCoordinates) => {
    setMapCoordinates(mapCoordinates);
  };

  return (
    <MapContext.Provider value={{ kakaoMap, initKakaoMap, mapCoordinates, updateMapCoordinates }}>
      {children}
    </MapContext.Provider>
  );
};
