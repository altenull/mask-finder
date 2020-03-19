import React, { useContext, useEffect, useState } from 'react';

import { MapContext, MapContextState } from '../../core/contexts';
import { SearchInput } from '../components';
import { Place, PlaceVM } from '../models/search';
import { parsePlaceVMFromPlace } from '../utils/search.util';

export const SearchContainer: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { updateMapCoordinates }: MapContextState = useContext(MapContext);

  const places = new window.kakao.maps.services.Places();

  useEffect(() => {
    if (!!keyword) {
      places.keywordSearch(keyword, (result: Place[], status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const placesVM: PlaceVM[] = result.map((place: Place) => parsePlaceVMFromPlace(place));
          if (placesVM.length > 0) {
            updateMapCoordinates(placesVM[0].coordinates);
          }
        }
      });
    }
  }, [keyword]);

  return <SearchInput setKeyword={setKeyword} />;
};
