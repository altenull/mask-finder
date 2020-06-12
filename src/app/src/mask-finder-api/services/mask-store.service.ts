import { GetMaskStoresResponse, MaskStore, MaskStoreVM } from '../models/mask-store';
import { parseMaskStoreVMFromMaskStore } from '../utils/mask-store.util';
import { MapCoordinates } from '../../map/models/map';

interface MaskStoreService {
  getMaskStores: (mapCoordinates: MapCoordinates) => Promise<MaskStoreVM[]>;
}

const getMaskStores = async ({latitude, longitude}: MapCoordinates): Promise<MaskStoreVM[]> => {
  const url: string = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${latitude}&lng=${longitude}&m=1000`;

  const { stores }: GetMaskStoresResponse = await fetch(url).then((response) => response.json());
  const maskStoresVM: MaskStoreVM[] = stores.map((maskStore: MaskStore) => parseMaskStoreVMFromMaskStore(maskStore));

  return maskStoresVM;
};

export const maskStoreService: MaskStoreService = {
  getMaskStores,
};
