import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export const MapContainer: React.FC = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return <div id='map' style={{ width: '100vw', height: '100vh' }} />;
};
