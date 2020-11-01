import '../../../assets/styles/custome-over-lay.css';

import React, { useContext, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { MapContext, MapContextType, MapContextActionTypes } from '../../core/contexts';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { ToggleButton } from '../../ui/buttons';
import { inlineZIndex } from '../../ui/inline-styles';
import { FullSizeMap, GeoLocationButton } from '../components';
import { StockFilterType } from '../enums/stock-filter-type.enum';
import { MaskStoreMarker, MapCoordinates } from '../models/map';
import {
  createKakaoLatLngInstance,
  createKakaoMapInstance,
  createKakaoMarkerInstance,
  getMaskStoreTooltipContent,
  removeMarkersFromMap,
  removeTooltipsFromMap,
  showSelectedMaskStoreTooltip,
  getFilteredMaskStoreMarkers,
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

const StdMapLoadingLayer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1100;
`;

const StdStockFilterPositioner = styled.div`
  position: absolute;
  right: 8px;
  top: 16px;
  z-index: 1000;
`;

const StdGeoLocationButton = styled(GeoLocationButton)`
  && {
    position: absolute;
    right: 8px;
    top: 80px;
    z-index: 1000;
  }
`;

export const MapContainer: React.FC = () => {
  const { mapState, mapDispatch }: MapContextType = useContext(MapContext);
  const [kakaoMap, setKakaoMap] = useState<any>(null);
  const [isMapLoading, setIsMapLoading] = useState<boolean>(false);
  const [canUseGeoLocation, setCanUseGeoLocation] = useState(false);
  const [selectedStockFilterType, setSelectedStockFilterType] = useState<StockFilterType>(StockFilterType.All);

  const mapCoordinates: MapCoordinates = mapState.mapCoordinates;

  const updateMapCoordinates = useCallback(
    (callBackMapCoordinates: MapCoordinates) =>
      mapDispatch({ type: MapContextActionTypes.UpdateMapCoordinates, mapCoordinates: callBackMapCoordinates }),
    [mapDispatch]
  );

  // Configure kakao map
  useEffect(() => {
    const fullSizeMapElement: HTMLElement | null = document.getElementById(FULL_SIZE_MAP_ID);

    if (fullSizeMapElement != null && kakaoMap == null) {
      const map = createKakaoMapInstance(fullSizeMapElement, mapCoordinates, MAP_MAX_LEVEL);

      map.setMaxLevel(MAP_MAX_LEVEL);

      window.kakao.maps.event.addListener(map, 'dragend', () => {
        const movedMapCenter = map.getCenter();
        updateMapCoordinates({
          latitude: movedMapCenter.getLat(),
          longitude: movedMapCenter.getLng(),
        });
      });

      setKakaoMap(map);
    }

    setCanUseGeoLocation(!!navigator.geolocation);
  }, [kakaoMap, mapCoordinates, updateMapCoordinates]);

  // Sync map center to updated map coordinates
  useEffect(() => {
    if (kakaoMap != null) {
      kakaoMap.panTo(createKakaoLatLngInstance(mapCoordinates));
    }
  }, [kakaoMap, mapCoordinates]);

  // TODO: Handle getMaskStores API's loading, erorr status
  const { maskStores } = useGetMaskStores(mapCoordinates);

  // Generate markers, overlaies
  useEffect(() => {
    if (kakaoMap != null) {
      const markerClickEventHandler: (marker: any, index: number) => void = (marker: any, index: number) => {
        removeTooltipsFromMap();
        showSelectedMaskStoreTooltip(index, kakaoMap);

        kakaoMap.panTo(marker.getPosition());
      };

      if (Array.isArray(window.markers)) {
        window.markers.forEach((marker: any, index: number) => {
          window.kakao.maps.event.removeListener(marker, 'click', () => markerClickEventHandler(marker, index));
        });
      }

      removeTooltipsFromMap();
      removeMarkersFromMap();

      const maskStoreMarkers: MaskStoreMarker[] = getFilteredMaskStoreMarkers(maskStores, selectedStockFilterType);

      window.markers = maskStoreMarkers.map((maskStoreMarker: MaskStoreMarker) =>
        createKakaoMarkerInstance(maskStoreMarker, kakaoMap)
      );

      window.overLaies = window.markers.map(
        (marker: any, index: number) =>
          new window.kakao.maps.CustomOverlay({
            content: getMaskStoreTooltipContent(maskStores[index]),
            position: marker.getPosition(),
            xAnchor: 0.23,
            yAnchor: 1.34,
            zIndex: inlineZIndex.tooltip,
          })
      );

      window.markers.forEach((marker: any, index: number) => {
        window.kakao.maps.event.addListener(marker, 'click', () => markerClickEventHandler(marker, index));
      });
    }
  }, [kakaoMap, maskStores, selectedStockFilterType]);

  const getCurrentDeviceCoordinates = () => {
    setIsMapLoading(true);

    const onGetCurrentDevicePositionSuccess = ({ coords: { latitude, longitude } }: Position) => {
      setIsMapLoading(false);

      updateMapCoordinates({
        latitude,
        longitude,
      });
    };

    // TODO: Set error type of getCurrentPosition
    // https://developer.mozilla.org/ko/docs/Web/API/GeolocationPositionError
    const onGetCurrentDevicePositionError = (err: any) => {
      setIsMapLoading(false);

      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(onGetCurrentDevicePositionSuccess, onGetCurrentDevicePositionError);
  };

  const STOCK_FILTER_TYPES: StockFilterType[] = [StockFilterType.All, StockFilterType.OnlyInStock];

  const selectStockFilter = (selectedIndex: number) => {
    setSelectedStockFilterType(STOCK_FILTER_TYPES[selectedIndex]);
  };

  return (
    <StdMapPositioner>
      {isMapLoading && <StdMapLoadingLayer />}
      <StdStockFilterPositioner>
        <ToggleButton items={STOCK_FILTER_TYPES} handleClick={selectStockFilter}></ToggleButton>
      </StdStockFilterPositioner>

      {canUseGeoLocation && <StdGeoLocationButton handleClick={getCurrentDeviceCoordinates} />}
      <FullSizeMap />
    </StdMapPositioner>
  );
};
