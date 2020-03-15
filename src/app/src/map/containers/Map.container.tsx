import React, { useEffect } from 'react';
import styled from 'styled-components';

declare global {
  interface Window {
    kakao: any;
  }
}

const StdFullSizeMap = styled.div`
  width: 100vw;
  height: 100vh;
`;

const FULL_SIZE_MAP_ID: string = 'full-size-map';

export const MapContainer: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById(FULL_SIZE_MAP_ID);
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return <StdFullSizeMap id={FULL_SIZE_MAP_ID} />;
};
