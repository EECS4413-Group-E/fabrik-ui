import type { ShippingStatusType } from './Order.ts';

export type ShippingDetails = {
  id: string;
  orderId: string;
  trackingNumber: string;
  country: string;
  postalCode: string;
  province: string;
  city: string;
  address: string;
  fullName: string;
  shippingStatus: ShippingStatusType;
};
