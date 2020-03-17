import { GetMaskStoresRequest, GetMaskStoresResponse, MaskStore, MaskStoreVM } from '../models/mask-store';
import { parseMaskStoreVMFromMaskStore } from '../utils/mask-store.util';

interface MaskStoreService {
  getMaskStores: (getMaskStoresRequest: GetMaskStoresRequest) => Promise<MaskStoreVM[]>;
}

const getMaskStores = async ({
  mapCoordinates: { latitude, longitude },
  distance,
}: GetMaskStoresRequest): Promise<MaskStoreVM[]> => {
  const url: string = `${process.env.REACT_APP_CORONA19_MASKS_END_POINT}/storesByGeo/json?lat=${latitude}&lng=${longitude}&m=${distance}`;

  const { stores }: GetMaskStoresResponse = await fetch(url).then((response) => response.json());
  const maskStoresVM: MaskStoreVM[] = stores.map((maskStore: MaskStore) => parseMaskStoreVMFromMaskStore(maskStore));

  return maskStoresVM;
};

export const maskStoreService: MaskStoreService = {
  getMaskStores,
};
