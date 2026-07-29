import type { OrderItem , ShippingStatusType} from '../../../models/Order.ts';
import type { ChipProps } from '@mui/material';
import type { PaymentDetails } from '../../../models/PaymentDetails.ts';



type StatusChipColor = NonNullable<ChipProps['color']>;
type PaymentStatus = PaymentDetails['completedPayments'][number]['status'];

export const formatCurrency = (
  amount: number,
  currency = 'CAD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatOrderDate = (
  dateValue?: string | null ): string => {
    if (!dateValue) {
      return 'Not available';
    }
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
      return 'Not available';
    }

    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

export const formatOrderDateTime = (
  dateValue?: string | null ): string => {
    if (!dateValue) {
      return 'Not available';
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return 'Not available';
    }
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

export const formatEnumLabel = (
  value?: string | null ): string => {
    if (!value) {
      return 'Not available';
    }

    return value
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .toLowerCase()
      .replace(/\b\w/g, (character) =>
        character.toUpperCase(),
      );
  };

export const getShippingStatusColor = (
  status : ShippingStatusType ): StatusChipColor => {
    switch (status) {
      case 'DELIVERED':
        return 'success';

      case 'SHIPPED':
        return 'info';

      case 'PREPARING':
        return 'default';
    }
  };

export const getPaymentStatusColor = (
  status : PaymentStatus ): StatusChipColor => {
    switch (status) {
      case 'APPROVED':
        return 'success';

      case 'DECLINED':
        return 'error';
    }
  };

export const getTotalQuantity = ( items: OrderItem[] ): number => {
  return items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
};