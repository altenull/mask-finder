import { useCallback, useEffect, useState } from 'react';
import { MapCoordinates } from '../../map/models/map';
import { MaskStoreVM } from '../models/mask-store';
import { maskStoreService } from '../services/mask-store.service';

/**
 * 공적마스크 판매 중단에 따른 공공데이터포털내 오픈 API 서비스 종료 (2020-07-08)
 * https://www.data.go.kr/bbs/ntc/selectNotice.do?originId=NOTICE_0000000001728
 */
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
    // getFetchData();
  }, [getFetchData]);

  return { maskStores, isGetMaskStoresLoading, getMaskStoresError };
};
