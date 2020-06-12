import React, { createContext, ReactNode, Dispatch, useReducer } from 'react';

import { MapCoordinates } from '../../map/models/map';

export enum MapContextActionTypes {
  UpdateMapCoordinates = '[Map] Update Map Coordinates'
}

const initialState = {
  mapCoordinates: {
    latitude: 37.564214,
    longitude: 127.001699,
  },
};

type State = typeof initialState;

type Action =
  | { type: MapContextActionTypes.UpdateMapCoordinates; mapCoordinates: MapCoordinates };
  
export interface MapContextType {
  mapState: State;
  mapDispatch: Dispatch<Action>;
}

export const MapContext = createContext<MapContextType>({mapState: initialState, mapDispatch: () => {} });

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case MapContextActionTypes.UpdateMapCoordinates:
      return {
        ...state,
        mapCoordinates: action.mapCoordinates
      };
    default:
      return state;
  }
}

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [mapState, mapDispatch] = useReducer(reducer, initialState);
 
  return (
    <MapContext.Provider value={{ mapState, mapDispatch }}>
      {children}
    </MapContext.Provider>
  );
};
