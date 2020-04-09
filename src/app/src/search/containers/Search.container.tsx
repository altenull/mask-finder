import React, { useContext, useEffect, useState } from 'react';

import { CoreContext, CoreContextState, MapContext, MapContextState } from '../../core/contexts';
import { SearchInput } from '../components';
import { Place, PlaceVM } from '../models/search';
import { parsePlaceVMFromPlace } from '../utils/search.util';

export const SearchContainer: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { isKakaoMapLoaded }: CoreContextState = useContext(CoreContext);
  const { updateMapCoordinates }: MapContextState = useContext(MapContext);

  useEffect(() => {
    if (!!keyword && isKakaoMapLoaded) {
      const places = new window.kakao.maps.services.Places();

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
