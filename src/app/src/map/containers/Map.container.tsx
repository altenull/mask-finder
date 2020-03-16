import React, { useEffect } from 'react';
import styled from 'styled-components';

import { zIndex } from '../../ui/inline-styles';
import { FullSizeMap } from '../components';
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
  useEffect(() => {
    const container = document.getElementById(FULL_SIZE_MAP_ID);
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return (
    <StdMapPositioner>
      <FullSizeMap />
    </StdMapPositioner>
  );
};
