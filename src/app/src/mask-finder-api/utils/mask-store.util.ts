import { MaskStoreType } from '../enums/mask-store-type.enum';
import { RemainStatus } from '../enums/remain-status.enum';
import { MaskStore, MaskStoreVM } from '../models/mask-store';

export const parseMaskStoreVMFromMaskStore = ({
  code,
  name,
  addr,
  type,
  lat,
  lng,
  stock_at,
  remain_stat,
  created_at,
}: MaskStore): MaskStoreVM => {
  return {
    name,
    id: code,
    roadAddress: addr,
    mapCoordinates: {
      latitude: lat,
      longitude: lng,
    },
    type: type as MaskStoreType,
    remainStatus: remain_stat as RemainStatus,
    stockDateTime: stock_at,
    updatedDateTime: created_at,
  };
};
