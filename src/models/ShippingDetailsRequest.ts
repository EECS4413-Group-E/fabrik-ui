import type { Province } from "./Provinces";

export interface ShippingDetailsRequest {
  country: string;
  postalCode: string;
  province: Province;
  city: string;
  address: string;
  fullName: string;
}