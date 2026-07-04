export const PaymentMethod = {
  CreditCard: "CREDIT_CARD",
  PayPal: "PAYPAL",
} as const;

export type PaymentMethod = typeof PaymentMethod[keyof typeof PaymentMethod];

export interface CheckoutFormValues {
  userId: string;
  paymentMethod: PaymentMethod;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paypalEmail: string;
}