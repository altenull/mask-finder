import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextState } from '../../core/contexts';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { zIndex } from '../../ui/inline-styles';
import { FullSizeMap } from '../components';
import { MapCoordinates } from '../models/map';
import { getKakaoLatLng } from '../utils/map.util';
import { FULL_SIZE_MAP_ID, MAP_MAX_LEVEL } from '../variables/map.variables';

const StdMapPositioner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${zIndex.map};
`;

export const MapContainer: React.FC = () => {
  const { kakaoMap, initKakaoMap, mapCoordinates, updateMapCoordinates }: MapContextState = useContext(MapContext);

  const initMap = () => {
    const container: HTMLElement | null = document.getElementById(FULL_SIZE_MAP_ID);

    if (container != null) {
      const map = new window.kakao.maps.Map(container, {
        center: getKakaoLatLng(mapCoordinates.latitude, mapCoordinates.longitude),
        level: MAP_MAX_LEVEL,
      });

      map.setMaxLevel(MAP_MAX_LEVEL);

      window.kakao.maps.event.addListener(map, 'dragend', () => {
        const mapCenter = map.getCenter();
        const movedMapCoordinates: MapCoordinates = {
          latitude: mapCenter.getLat(),
          longitude: mapCenter.getLng(),
        };
        updateMapCoordinates(movedMapCoordinates);
      });

      initKakaoMap(map);
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (kakaoMap != null) {
      kakaoMap.panTo(getKakaoLatLng(mapCoordinates.latitude, mapCoordinates.longitude));
    }
  }, [mapCoordinates]);

  const [maskStores, isGetMaskStoresLoading, getMaskStoresError] = useGetMaskStores({ mapCoordinates, distance: 2000 });

  return (
    <StdMapPositioner>
      <FullSizeMap />
    </StdMapPositioner>
  );
};
