import { GetMaskStoresRequest, GetMaskStoresResponse, MaskStore, MaskStoreVM } from '../models/mask-store';
import { parseMaskStoreVMFromMaskStore } from '../utils/mask-store.util';

interface MaskStoreService {
  getMaskStores: (getMaskStoresRequest: GetMaskStoresRequest) => Promise<MaskStoreVM[]>;
}

const getMaskStores = async ({
  mapCoordinates: { latitude, longitude },
  distance,
}: GetMaskStoresRequest): Promise<MaskStoreVM[]> => {
  const url: string = `https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=${latitude}&lng=${longitude}&m=${distance}`;

  const { stores }: GetMaskStoresResponse = await fetch(url).then((response) => response.json());
  const maskStoresVM: MaskStoreVM[] = stores.map((maskStore: MaskStore) => parseMaskStoreVMFromMaskStore(maskStore));

  return maskStoresVM;
};

export const maskStoreService: MaskStoreService = {
  getMaskStores,
};
