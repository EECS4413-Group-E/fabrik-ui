import type { PaymentMethod } from './Checkout.ts';

export type PaymentDetails = {
  id: string;
  paymentNumber: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: 'APPROVED' | 'DECLINED';
  paymentReference: string;
  message: string;
  installments?: number;
};
