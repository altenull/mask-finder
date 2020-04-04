import markerGray from '../../../assets/images/map/marker_gray.png';
import markerGreen from '../../../assets/images/map/marker_green.png';
import markerRed from '../../../assets/images/map/marker_red.png';
import markerYellow from '../../../assets/images/map/marker_yellow.png';
import { RemainStatus } from '../../mask-finder-api/enums/remain-status.enum';
import { MaskStoreVM } from '../../mask-finder-api/models/mask-store';
import { inlineZIndex } from '../../ui/inline-styles';
import { MapCoordinates, MaskStoreMarker } from '../models/map';

export const createKakaoMapInstance = (container: HTMLElement, mapCoordinates: MapCoordinates, level: number) =>
  new window.kakao.maps.Map(container, {
    level,
    center: createKakaoLatLngInstance(mapCoordinates),
  });

export const createKakaoLatLngInstance = ({ latitude, longitude }: MapCoordinates) =>
  new window.kakao.maps.LatLng(latitude, longitude);

export const createKakaoMarkerInstance = ({ title, position, image, zIndex }: MaskStoreMarker, map: any) =>
  new window.kakao.maps.Marker({
    position,
    title,
    image,
    zIndex,
    map,
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
      zIndex:
        maskStore.remainStatus === RemainStatus.Plenty ||
        maskStore.remainStatus === RemainStatus.Some ||
        maskStore.remainStatus === RemainStatus.Few
          ? inlineZIndex.colorMarker
          : inlineZIndex.grayMarker,
    };
  });

export const getMaskStoreTooltipContent = ({
  id,
  name,
  roadAddress,
  mapCoordinates: { latitude, longitude },
  type,
  remainStatus,
  stockDateTime,
  updatedDateTime,
}: MaskStoreVM) => {
  const remainStatusTextMap: { [key: string]: string } = {
    [RemainStatus.Plenty]: '많음(100개 이상)',
    [RemainStatus.Some]: '보통(30 ~ 99개)',
    [RemainStatus.Few]: '적음(2 ~ 29개)',
    [RemainStatus.Empty]: '없음(1개 이하)',
  };
  const findRouteLink: string = `https://map.kakao.com/link/to/${name},${latitude},${longitude}`;

  return `
    <div class="mask-store-tooltip">
      <div class="mask-store-tooltip__top-group">
        <i class="mask-store-tooltip__close-icon" onclick="removeMaskStoreTooltip()" >
          <svg stroke="#999999" fill="#999999" stroke-width="0" viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
        </i>
        <h2 class="mask-store-tooltip__name">${name}</h2>
        <p class="mask-store-tooltip__address">${roadAddress}</p>
        <a class="mask-store-tooltip__find-route" href="${findRouteLink}" rel="noopener" target="_blank" title="길찾기">
          <svg stroke="#ffffff" fill="#ffffff" stroke-width="0" viewBox="0 0 512 512" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M416 320h-96c-17.6 0-32-14.4-32-32s14.4-32 32-32h96s96-107 96-160-43-96-96-96-96 43-96 96c0 25.5 22.2 63.4 45.3 96H320c-52.9 0-96 43.1-96 96s43.1 96 96 96h96c17.6 0 32 14.4 32 32s-14.4 32-32 32H185.5c-16 24.8-33.8 47.7-47.3 64H416c52.9 0 96-43.1 96-96s-43.1-96-96-96zm0-256c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM96 256c-53 0-96 43-96 96s96 160 96 160 96-107 96-160-43-96-96-96zm0 128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"></path></svg>
        </a>
      </div>
      <div class="mask-store-tooltip__diagonal-divider"></div>
      <div class="mask-store-tooltip__bottom-group">
        <h2 class="mask-store-tooltip__remain-status">${
          remainStatus === RemainStatus.Break
            ? '판매 중지'
            : `${remainStatus != null ? remainStatusTextMap[remainStatus] : '정보 없음'}`
        }</h2>
        ${stockDateTime != null ? `<p class="mask-store-tooltip__stock-time">입고시간 ${stockDateTime}</p>` : ''}
        ${updatedDateTime != null ? `<p class="mask-store-tooltip__update-time">업데이트 ${updatedDateTime}</p>` : ''}
      </div>
    </div>
  `;
};
