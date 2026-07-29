import type { PaymentMethod } from './Checkout.ts';

export type PaymentDetails = {
  completedPayments: {
    id: string;
    paymentNumber: string;
    orderId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    status: 'APPROVED' | 'DECLINED';
    paymentReference: string;
    message: string;
    createdDate: string;
    usedStorePoints: number;
    awardedStorePoints: number;
    installments?: number;
    totalInstallments: number;
  }[];
  scheduledPayments: {
    id: string;
    orderId: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentMethod;
    paymentReference: string;
    paymentDate: string;
    installments?: number;
    totalinstallments: number;
  }[];
};
