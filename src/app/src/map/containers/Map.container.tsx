import '../../../assets/styles/custome-over-lay.css';

import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import { CoreContext, CoreContextState, MapContext, MapContextState } from '../../core/contexts';
import { RemainStatus } from '../../mask-finder-api/enums/remain-status.enum';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { MaskStoreVM } from '../../mask-finder-api/models/mask-store';
import { ToggleButton } from '../../ui/buttons';
import { inlineZIndex } from '../../ui/inline-styles';
import { FullSizeMap, GeoLocationButton } from '../components';
import { StockFilterType } from '../enums/stock-filter-type.enum';
import { MaskStoreMarker } from '../models/map';
import {
  createKakaoLatLngInstance,
  createKakaoMapInstance,
  createKakaoMarkerInstance,
  getMaskStoreMarkers,
  getMaskStoreTooltipContent,
  removeMarkersFromMap,
  removeOverLaiesFromMap,
  showMaskStoreTooltipOfSelectedMarker,
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
  const { isKakaoMapLoaded }: CoreContextState = useContext(CoreContext);
  const {
    kakaoMap,
    initKakaoMap,
    mapCoordinates,
    updateMapCoordinates,
    selectedStockFilterType,
    selectStockFilter,
  }: MapContextState = useContext(MapContext);
  const [canUseGeoLocation, setCanUseGeoLocation] = useState(false);

  // Initialize map container
  useEffect(() => {
    if (isKakaoMapLoaded) {
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
    }

    setCanUseGeoLocation(!!navigator.geolocation);
  }, [isKakaoMapLoaded]);

  useEffect(() => {
    if (kakaoMap != null) {
      kakaoMap.panTo(createKakaoLatLngInstance(mapCoordinates));
    }
  }, [mapCoordinates]);

  const { maskStores, isGetMaskStoresLoading, getMaskStoresError } = useGetMaskStores({
    mapCoordinates,
    distance: 1000,
  });

  useEffect(() => {
    if (kakaoMap != null) {
      removeMarkersFromMap();
      removeOverLaiesFromMap();

      const filterdMaskStores: MaskStoreVM[] =
        selectedStockFilterType === StockFilterType.OnlyInStock
          ? maskStores.filter(
              (maskStore: MaskStoreVM) =>
                maskStore.remainStatus === RemainStatus.Plenty ||
                maskStore.remainStatus === RemainStatus.Some ||
                maskStore.remainStatus === RemainStatus.Few
            )
          : maskStores;
      const maskStoreMarkers: MaskStoreMarker[] = getMaskStoreMarkers(filterdMaskStores);

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
        window.kakao.maps.event.addListener(marker, 'click', function() {
          removeOverLaiesFromMap();
          showMaskStoreTooltipOfSelectedMarker(index, kakaoMap);

          kakaoMap.panTo(marker.getPosition());
        });
      });
    }
  }, [maskStores, selectedStockFilterType]);

  const getCurrentCoordinates = () => {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      updateMapCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  const stockFilterTypes: StockFilterType[] = [StockFilterType.All, StockFilterType.OnlyInStock];

  const selectStockFilterWrapper = (selectedIndex: number) => {
    selectStockFilter(stockFilterTypes[selectedIndex]);
  };

  return (
    <StdMapPositioner>
      <StdStockFilterPositioner>
        <ToggleButton items={stockFilterTypes} handleClick={selectStockFilterWrapper}></ToggleButton>
      </StdStockFilterPositioner>

      {canUseGeoLocation && <StdGeoLocationButton handleClick={getCurrentCoordinates} />}
      <FullSizeMap />
    </StdMapPositioner>
  );
};
