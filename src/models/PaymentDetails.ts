import type { PaymentMethod } from './Checkout.ts';

export type PaymentDetails = {
  completedPayments: {
    id: string;
    paymentNumber: string;
    orderId: string;
    amount: number;
    tax: number;
    finalAmount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    status: 'APPROVED' | 'DECLINED';
    paymentReference: string;
    message: string;
    createdDate: string;
    usedStorePoints: number;
    awardedStorePoints: number;
    installment?: number;
    totalInstallments: number;
  }[];
  scheduledPayments: {
    id: string;
    orderId: string;
    amount: number;
    tax: number;
    finalAmount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentReference: string;
    paymentDate: string;
    installment?: number;
    totalInstallments: number;
  }[];
};
