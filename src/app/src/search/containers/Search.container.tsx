import React, { useContext, useEffect, useState, useCallback } from 'react';

import { MapContext, MapContextType, MapContextActionTypes } from '../../core/contexts';
import { SearchInput } from '../components';
import { Place, PlaceVM } from '../models/search';
import { parsePlaceVMFromPlace } from '../utils/search.util';
import { MapCoordinates } from '../../map/models/map';

export const SearchContainer: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { mapDispatch }: MapContextType = useContext(MapContext);

  const updateMapCoordinates = useCallback((callBackMapCoordinates: MapCoordinates) => 
    mapDispatch({type: MapContextActionTypes.UpdateMapCoordinates, mapCoordinates: callBackMapCoordinates}), [mapDispatch]);

  useEffect(() => {
    if (!!keyword) {
      const places = new window.kakao.maps.services.Places();

      places.keywordSearch(keyword, (result: Place[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const placesVM: PlaceVM[] = result.map((place: Place) => parsePlaceVMFromPlace(place));
          const hasAtLeastOnePlace: boolean = placesVM.length > 0;

          if (hasAtLeastOnePlace) {
            updateMapCoordinates(placesVM[0].coordinates);
          }
        }
      });
    }
  }, [keyword, updateMapCoordinates]);

  return <SearchInput setKeyword={setKeyword} />;
};
