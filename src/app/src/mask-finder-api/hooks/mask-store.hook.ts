import { useEffect, useState } from 'react';

import { GetMaskStoresRequest, MaskStoreVM } from '../models/mask-store';
import { maskStoreService } from '../services/mask-store.service';

export const useGetMaskStores = (getMaskStoresRequest: GetMaskStoresRequest) => {
  const [maskStores, setMaskStores] = useState<MaskStoreVM[]>([]);
  const [isGetMaskStoresLoading, setIsGetMaskStoresLoading] = useState<boolean>(false);
  const [getMaskStoresError, setGetMaskStoresError] = useState(null);

  const fetchData = async () => {
    setGetMaskStoresError(null);

    try {
      setIsGetMaskStoresLoading(true);
      setMaskStores(await maskStoreService.getMaskStores(getMaskStoresRequest));
    } catch (error) {
      setGetMaskStoresError(error);
    } finally {
      setIsGetMaskStoresLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getMaskStoresRequest.mapCoordinates]);

  return [maskStores, isGetMaskStoresLoading, getMaskStoresError];
};
