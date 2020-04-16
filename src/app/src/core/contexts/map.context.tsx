import React, { createContext, ReactNode, useState } from 'react';

import { StockFilterType } from '../../map/enums/stock-filter-type.enum';
import { MapCoordinates } from '../../map/models/map';

export interface MapContextState {
  kakaoMap: any;
  initKakaoMap: (kakaoMap: any) => void;
  mapCoordinates: MapCoordinates;
  updateMapCoordinates: (mapCoordinates: MapCoordinates) => void;
  selectedStockFilterType: StockFilterType;
  selectStockFilter: (selectedStockFilterType: StockFilterType) => void;
  isMapLoading: boolean;
  startMapLoading: () => void;
  stopMapLoading: () => void;
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
  selectedStockFilterType: StockFilterType.All,
  selectStockFilter: (selectedStockFilterType: StockFilterType) => {},
  isMapLoading: false,
  startMapLoading: () => {},
  stopMapLoading: () => {},
};

export const MapContext = createContext<MapContextState>(initialState);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [kakaoMap, setKakaoMap] = useState(DEFAULT_KAKAO_MAP);
  const [mapCoordinates, setMapCoordinates] = useState<MapCoordinates>(DEFAULT_MAP_COORDINATES);
  const [selectedStockFilterType, setSelectedStockFilterType] = useState<StockFilterType>(StockFilterType.All);
  const [isMapLoading, setIsMapLoading] = useState(false);

  const initKakaoMap = (kakaoMap: any) => {
    setKakaoMap(kakaoMap);
  };

  const updateMapCoordinates = (mapCoordinates: MapCoordinates) => {
    setMapCoordinates(mapCoordinates);
  };

  const selectStockFilter = (selectedStockFilterType: StockFilterType) => {
    setSelectedStockFilterType(selectedStockFilterType);
  };

  const startMapLoading = () => {
    setIsMapLoading(true);
  };

  const stopMapLoading = () => {
    setIsMapLoading(false);
  };

  return (
    <MapContext.Provider
      value={{
        kakaoMap,
        initKakaoMap,
        mapCoordinates,
        updateMapCoordinates,
        selectedStockFilterType,
        selectStockFilter,
        isMapLoading,
        startMapLoading,
        stopMapLoading,
      }}>
      {children}
    </MapContext.Provider>
  );
};
