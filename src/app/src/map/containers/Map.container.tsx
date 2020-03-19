import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextState } from '../../core/contexts';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { zIndex } from '../../ui/inline-styles';
import { FullSizeMap } from '../components';
import { MaskStoreMarker } from '../models/map';
import {
  createKakaoLatLngInstance,
  createKakaoMapInstance,
  createKakaoMarkerInstance,
  getMaskStoreMarkers,
} from '../utils/map.util';
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
      const map = createKakaoMapInstance(container, mapCoordinates, MAP_MAX_LEVEL);

      map.setMaxLevel(MAP_MAX_LEVEL);

      window.kakao.maps.event.addListener(map, 'dragend', () => {
        const movedMapCenter = map.getCenter();
        updateMapCoordinates({
          latitude: movedMapCenter.getLat(),
          longitude: movedMapCenter.getLng(),
        });
      });

      initKakaoMap(map);
    }
  };

  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (kakaoMap != null) {
      kakaoMap.panTo(createKakaoLatLngInstance(mapCoordinates));
    }
  }, [mapCoordinates]);

  const { maskStores, isGetMaskStoresLoading, getMaskStoresError } = useGetMaskStores({
    mapCoordinates,
    distance: 2000,
  });

  let cachedMarkers: any[] = [];

  useEffect(() => {
    if (kakaoMap != null) {
      cachedMarkers.forEach((cachedMarker) => {
        cachedMarker.setMap(null);
      });

      const maskStoreMarkers: MaskStoreMarker[] = getMaskStoreMarkers(maskStores);
      const kakaoMarkers = maskStoreMarkers.map((maskStoreMarker: MaskStoreMarker) =>
        createKakaoMarkerInstance(maskStoreMarker)
      );

      cachedMarkers = kakaoMarkers;

      cachedMarkers.forEach((cachedMarker) => {
        cachedMarker.setMap(kakaoMap);
      });
    }
  }, [maskStores]);

  return (
    <StdMapPositioner>
      <FullSizeMap />
    </StdMapPositioner>
  );
};
