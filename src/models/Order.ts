import type { PaymentDetails } from "./Checkout";

export const OrderStatus = {
  Preparing: "PREPARING",
  Shipped: "SHIPPED",
  Delivered: "DELIVERED",
  Cancelled: "CANCELLED",
} as const;

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];

export interface PlaceOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface PlaceOrderRequest {
  userId: string;
  orderItems: PlaceOrderItem[];
  paymentDetails: PaymentDetails;
}

export interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdDate: string;
  deliveredDate: string | null;
  totalPrice: number;
  orderItems: OrderItem[];
  orderStatus: OrderStatus;
  userId: string;
}
