import { MapCoordinates } from '../../map/models/map';
import { MaskStoreType } from '../enums/mask-store-type.enum';
import { RemainStatus } from '../enums/remain-status.enum';

export interface MaskStore {
  code: string;
  name: string;
  addr: string;
  type: string;
  lat: number;
  lng: number;
  remain_stat: string | null;
  stock_at: string | null; // YYYY/MM/DD HH:mm:s
  created_at: string | null; // YYYY/MM/DD HH:mm:s
}

export interface MaskStoreVM {
  id: string;
  name: string;
  roadAddress: string;
  mapCoordinates: MapCoordinates;
  type: MaskStoreType;
  remainStatus: RemainStatus | null;
  stockDateTime: string | null; // YYYY/MM/DD HH:mm:s
  createdDateTime: string | null; // YYYY/MM/DD HH:mm:s
}

export interface GetMaskStoresRequest {
  mapCoordinates: MapCoordinates;
  distance: number; // Meter
}

export interface GetMaskStoresResponse {
  count: number;
  stores: MaskStore[];
}
