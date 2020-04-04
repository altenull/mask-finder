import '../../../assets/styles/custome-over-lay.css';

import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { isArray } from 'util';

import { MapContext, MapContextState } from '../../core/contexts';
import { RemainStatus } from '../../mask-finder-api/enums/remain-status.enum';
import { useGetMaskStores } from '../../mask-finder-api/hooks/mask-store.hook';
import { MaskStoreVM } from '../../mask-finder-api/models/mask-store';
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

const StdFilterButton = styled.button`
  position: absolute;
  right: 0;
  top: 16px;
  width: 80px;
  height: 40px;
  z-index: 1000;
`;

export const MapContainer: React.FC = () => {
  const {
    kakaoMap,
    initKakaoMap,
    mapCoordinates,
    updateMapCoordinates,
    shouldFilterOnlyInStock,
    toggleStockFilter,
  }: MapContextState = useContext(MapContext);

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

  const removeMarkersFromMap = () => {
    if (isArray(window.markers)) {
      window.markers.forEach((marker: any) => {
        marker.setMap(null);
      });
    }
  };

  const removeOverLaiesFromMap = () => {
    if (isArray(window.overLaies)) {
      window.overLaies.forEach((overLay: any) => {
        overLay.setMap(null);
      });
    }
  };

  const showOverlayOfSelectedMarker = (index: number, kakaoMap: any) => {
    if (isArray(window.overLaies)) {
      window.overLaies[index].setMap(kakaoMap);
    }
  };

  useEffect(() => {
    if (kakaoMap != null) {
      removeMarkersFromMap();
      removeOverLaiesFromMap();

      const filterdMaskStores: MaskStoreVM[] = shouldFilterOnlyInStock
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
          showOverlayOfSelectedMarker(index, kakaoMap);
          kakaoMap.panTo(marker.getPosition());
        });
      });
    }
  }, [maskStores, shouldFilterOnlyInStock]);

  return (
    <StdMapPositioner>
      <StdFilterButton onClick={() => toggleStockFilter()}>
        {shouldFilterOnlyInStock ? 'In Stock' : 'All'}
      </StdFilterButton>
      <FullSizeMap />
    </StdMapPositioner>
  );
};
