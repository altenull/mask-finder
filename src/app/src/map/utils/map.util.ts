import { MapCoordinates } from '../models/map';

export const createKakaoMapInstance = (container: HTMLElement, mapCoordinates: MapCoordinates, level: number) =>
  new window.kakao.maps.Map(container, {
    level,
    center: createKakaoLatLngInstance(mapCoordinates),
  });

export const createKakaoLatLngInstance = ({ latitude, longitude }: MapCoordinates) =>
  new window.kakao.maps.LatLng(latitude, longitude);
