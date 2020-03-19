import markerGray from '../../../assets/images/map/marker_gray.png';
import markerGreen from '../../../assets/images/map/marker_green.png';
import markerRed from '../../../assets/images/map/marker_red.png';
import markerYellow from '../../../assets/images/map/marker_yellow.png';
import { RemainStatus } from '../../mask-finder-api/enums/remain-status.enum';
import { MaskStoreVM } from '../../mask-finder-api/models/mask-store';
import { MapCoordinates, MaskStoreMarker } from '../models/map';

export const createKakaoMapInstance = (container: HTMLElement, mapCoordinates: MapCoordinates, level: number) =>
  new window.kakao.maps.Map(container, {
    level,
    center: createKakaoLatLngInstance(mapCoordinates),
  });

export const createKakaoLatLngInstance = ({ latitude, longitude }: MapCoordinates) =>
  new window.kakao.maps.LatLng(latitude, longitude);

export const createKakaoMarkerInstance = ({ title, position, image }: MaskStoreMarker) =>
  new window.kakao.maps.Marker({
    position,
    title,
    image,
  });

export const getMarkerImageSrc = (remainStatus: RemainStatus | null): string => {
  const remainStatusMarkerImageMap: { [key: string]: string } = {
    [RemainStatus.Plenty]: markerGreen,
    [RemainStatus.Some]: markerYellow,
    [RemainStatus.Few]: markerRed,
    [RemainStatus.Empty]: markerGray,
    [RemainStatus.Break]: markerGray,
  };

  return remainStatus != null ? remainStatusMarkerImageMap[remainStatus] : markerGray;
};

export const getMaskStoreMarkers = (maskStores: MaskStoreVM[]): MaskStoreMarker[] =>
  maskStores.map((maskStore: MaskStoreVM) => {
    const imageSize = new window.kakao.maps.Size(36, 60);
    const markerImage = new window.kakao.maps.MarkerImage(getMarkerImageSrc(maskStore.remainStatus), imageSize);

    return {
      title: maskStore.name,
      position: createKakaoLatLngInstance(maskStore.mapCoordinates),
      image: markerImage,
    };
  });
