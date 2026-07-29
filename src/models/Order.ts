import type { PaymentDetailsRequest } from './Checkout';
import type { Size } from './Size.ts';
import type { PaymentDetails } from './PaymentDetails.ts';
import type { ShippingDetails } from './ShippingDetails.ts';
import type { ShippingDetailsRequest } from './ShippingDetailsRequest';

export const ShippingStatus = {
  Preparing: 'PREPARING',
  Shipped: 'SHIPPED',
  Delivered: 'DELIVERED',
} as const;

export type ShippingStatusType = (typeof ShippingStatus)[keyof typeof ShippingStatus];

export interface PlaceOrderItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface PlaceOrderRequest {
  userId: string | undefined;
  orderItems: PlaceOrderItem[];
  paymentDetails: PaymentDetailsRequest;
  shippingDetails: ShippingDetailsRequest;
}

export interface OrderItem {
  id: string;
  productId: string;
  listingId: string;
  sku: string;
  name: string;
  description: string;
  colorName: string;
  imageLink: string;
  size: Size;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdDate: string;
  deliveredDate: string | null;
  totalPrice: number;
  items: OrderItem[];
  userId: string;
  paymentDetails: PaymentDetails;
  shippingDetails: ShippingDetails;
}
