import { useEffect, useState, useCallback } from 'react';

import { MaskStoreVM } from '../models/mask-store';
import { maskStoreService } from '../services/mask-store.service';
import { MapCoordinates } from '../../map/models/map';

export const useGetMaskStores = (mapCoordinates: MapCoordinates) => {
  const [maskStores, setMaskStores] = useState<MaskStoreVM[]>([]);
  const [isGetMaskStoresLoading, setIsGetMaskStoresLoading] = useState<boolean>(false);
  const [getMaskStoresError, setGetMaskStoresError] = useState(null);

  const init = () => {
    setMaskStores([]);
    setIsGetMaskStoresLoading(false);
    setGetMaskStoresError(null);
  };

  const getFetchData = useCallback(async () => {
    init();

    try {
      setIsGetMaskStoresLoading(true);
      setMaskStores(await maskStoreService.getMaskStores(mapCoordinates));
    } catch (error) {
      setGetMaskStoresError(error);
    } finally {
      setIsGetMaskStoresLoading(false);
    }
  }, [mapCoordinates]);

  useEffect(() => {
    getFetchData();
  }, [getFetchData]);

  return { maskStores, isGetMaskStoresLoading, getMaskStoresError };
};
