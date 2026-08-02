import type { Province } from "./Provinces";

export const PaymentMethod = {
  CreditCard: "CREDIT_CARD",
  PayPal: "PAYPAL",
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

export interface PaymentDetailsRequest {
  paymentMethod: PaymentMethod;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  paypalEmail?: string;
  storePoints?: number;
  installments?: number;
  province: Province;
}

export interface CheckoutFormValues {
  paymentMethod: PaymentMethod;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
  storePoints: number;
  country: string;
  postalCode: string;
  province: string;
  city: string;
  address: string;
  fullName: string;
  installments: number;
}