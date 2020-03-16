import { Place, PlaceVM } from '../models/search';

export const parsePlaceVMFromPlace: (place: Place) => PlaceVM = ({
  id,
  place_name,
  address_name,
  road_address_name,
  x,
  y,
}: Place) => {
  return {
    id,
    name: place_name,
    address: address_name,
    roadAddress: road_address_name,
    coordinates: {
      latitude: +y,
      longitude: +x,
    },
  };
};
