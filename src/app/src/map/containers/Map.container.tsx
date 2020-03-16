import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextState } from '../../core/contexts';
import { zIndex } from '../../ui/inline-styles';
import { FullSizeMap } from '../components';
import { getKakaoLatLng } from '../utils/map.util';
import { FULL_SIZE_MAP_ID } from '../variables/map.variables';

const StdMapPositioner = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: ${zIndex.map};
`;

export const MapContainer: React.FC = () => {
  const { kakaoMap, initKakaoMap, mapCoordinates }: MapContextState = useContext(MapContext);

  const initMap = () => {
    const container: HTMLElement | null = document.getElementById(FULL_SIZE_MAP_ID);

    if (container != null) {
      const options = {
        center: getKakaoLatLng(mapCoordinates.latitude, mapCoordinates.longitude),
        level: 4,
      };

      initKakaoMap(new window.kakao.maps.Map(container, options));
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

  return (
    <StdMapPositioner>
      <FullSizeMap />
    </StdMapPositioner>
  );
};
