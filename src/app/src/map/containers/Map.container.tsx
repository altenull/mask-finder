import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextState } from '../../core/contexts';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { MaskStoreVM } from '../../mask-finder-api/models/mask-store';
import { zIndex } from '../../ui/inline-styles';
import { FullSizeMap } from '../components';
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
      kakaoMap.panTo(getKakaoLatLng(mapCoordinates.latitude, mapCoordinates.longitude));
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

      const positions = maskStores.map((maskStore: MaskStoreVM) => ({
        title: maskStore.name,
        latLng: getKakaoLatLng(maskStore.mapCoordinates.latitude, maskStore.mapCoordinates.longitude),
      }));

      const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      const imageSize = new window.kakao.maps.Size(24, 35);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      const markers = positions.map(
        (position) =>
          new window.kakao.maps.Marker({
            position: position.latLng,
            title: position.title,
            image: markerImage,
          })
      );

      cachedMarkers = markers;

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
