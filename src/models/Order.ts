export const OrderStatus = {
  Preparing: "PREPARING",
  Shipped: "SHIPPED",
  Delivered: "DELIVERED",
  Cancelled: "CANCELLED",
} as const;

export type OrderStatus = typeof OrderStatus[keyof typeof OrderStatus];

export interface CreateOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface CreateOrderRequest {
  totalPrice: number;
  orderItems: CreateOrderItem[];
  orderStatus: OrderStatus;
  userId: string;
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