export interface Place {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
}

export interface PlaceVM {
  id: string;
  name: string;
  address: string;
  roadAddress: string;
  latitude: string;
  longitude: string;
}
