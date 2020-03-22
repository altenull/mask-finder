import '../../../assets/styles/custome-over-lay.css';

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextState } from '../../core/contexts';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { inlineZIndex } from '../../ui/inline-styles';
import { FullSizeMap } from '../components';
import { MaskStoreMarker } from '../models/map';
import {
  createKakaoLatLngInstance,
  createKakaoMapInstance,
  createKakaoMarkerInstance,
  getMaskStoreMarkers,
  getMaskStoreTooltipContent,
} from '../utils/map.util';
import { FULL_SIZE_MAP_ID, MAP_MAX_LEVEL } from '../variables/map.variables';

const StdMapPositioner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${inlineZIndex.map};
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
    distance: 1000,
  });

  let cachedMarkers: any[] = [];

  useEffect(() => {
    // // 마커 위에 커스텀오버레이를 표시합니다
    // // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
    // var overlay = new kakao.maps.CustomOverlay({
    //   content: content,
    //   map: map,
    //   position: marker.getPosition()
    // });

    // // 마커를 클릭했을 때 커스텀 오버레이를 표시합니다
    // kakao.maps.event.addListener(marker, 'click', function() {
    //   overlay.setMap(map);
    // });

    // var clickHandler = function(event) {
    //   alert('click: ' + event.latLng.toString());
    // };

    // kakao.maps.event.addListener(map, 'click', clickHandler);
    // kakao.maps.event.removeListener(map, 'click', clickHandler);

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

      cachedMarkers.forEach((cachedMarker, index) => {
        window.kakao.maps.event.addListener(cachedMarker, 'click', function() {
          const overlay = new window.kakao.maps.CustomOverlay({
            content: getMaskStoreTooltipContent(maskStores[index]),
            map: kakaoMap,
            position: cachedMarker.getPosition(),
            xAnchor: 0.23,
            yAnchor: 1.34,
            zIndex: inlineZIndex.tooltip,
          });

          overlay.setMap(kakaoMap);
        });
      });
    }
  }, [maskStores]);

  return (
    <StdMapPositioner>
      <FullSizeMap />
    </StdMapPositioner>
  );
};
