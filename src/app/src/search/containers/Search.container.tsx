import React, { useContext, useEffect, useState } from 'react';

import { MapContext, MapContextState } from '../../core/contexts';
import { SearchInput } from '../components';
import { Place, PlaceVM } from '../models/search';
import { parsePlaceVMFromPlace } from '../utils/search.util';

export const SearchContainer: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { updateMapCoordinates }: MapContextState = useContext(MapContext);

  useEffect(() => {
    const places = new window.kakao.maps.services.Places();

    const callback = (result: Place[], status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const placeVMs: PlaceVM[] = result.map((place: Place) => parsePlaceVMFromPlace(place));
        if (placeVMs.length > 0) {
          updateMapCoordinates(placeVMs[0].coordinates);
        }
      }
    };

    places.keywordSearch(keyword, callback);
  }, [keyword]);

  return <SearchInput setKeyword={setKeyword} />;
};
