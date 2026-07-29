import type { ReactNode } from 'react';
import { Link,useParams } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { orderDetailsQueryOptions } from '../../../queries.ts';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';


import OrderDetailsItem from './OrderDetailsItem.tsx';
import type { PaymentDetails } from '../../../models/PaymentDetails.ts';


import {
  formatCurrency,
  formatEnumLabel,
  formatOrderDate,
  formatOrderDateTime,
  getPaymentStatusColor,
  getShippingStatusColor,
  getTotalQuantity,
} from '../-utils/orderUtils.ts';


type CompletedPayment = PaymentDetails['completedPayments'][number];

type ScheduledPayment = PaymentDetails['scheduledPayments'][number];


const OrderDetails = () => {
  const { orderId } = useParams({ from: '/orders/$orderId/' });

  const { data: order } = useSuspenseQuery(orderDetailsQueryOptions(orderId));

  const items = order.items ?? [];
  const shipping = order.shippingDetails;

  const completedPayments = order.paymentDetails?.completedPayments ?? [];
  const scheduledPayments = order.paymentDetails?.scheduledPayments ?? [];
  const totalQuantity = getTotalQuantity(items);


  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        px: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        py: {
          xs: 4,
          md: 6,
        },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Button
          component={Link}
          to="/orders"
          variant="text"
          startIcon={<ArrowBackOutlinedIcon />}
          sx={{ mb: 3 }}
        >
          Back to orders
        </Button>

        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            mb: 4,
          }}
        >
          <Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{ alignItems: 'center' }}
            >
              <ReceiptLongOutlinedIcon color="primary" />

              <Typography
                component="h1"
                variant="h3"
                sx={{ fontWeight: 600 }}
              >
                Order #{order.orderNumber}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                alignItems: 'center',
                mt: 1,
              }}
            >
              <CalendarMonthOutlinedIcon
                fontSize="small"
                color="action"
              />

              <Typography color="text.secondary">
                Placed {formatOrderDate(order.createdDate)}
              </Typography>
            </Stack>
          </Box>

          <Chip
            icon={<LocalShippingOutlinedIcon />}
            label={formatEnumLabel(
              shipping?.shippingStatus,
            )}
            color={getShippingStatusColor(
              shipping?.shippingStatus,
            )}
            variant="outlined"
          />
        </Stack>

        <Stack spacing={3}>
          <Card>
            <CardContent sx={cardContentStyles}>
              <SectionHeading
                icon={<ShoppingBagOutlinedIcon />}
                title="Items in this order"
              />

              {items.length === 0 ? (
                <Typography color="text.secondary">
                  Product information is unavailable for
                  this order.
                </Typography>
              ) : (
                <Stack
                  spacing={3}
                  divider={<Divider flexItem />}
                >
                  {items.map((item) => (
                    <OrderDetailsItem
                      key={item.id}
                      item={item}
                    />
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: 'repeat(2, minmax(0, 1fr))',
              },
              gap: 3,
            }}
          >
            <Card>
              <CardContent sx={cardContentStyles}>
                <SectionHeading
                  icon={<LocationOnOutlinedIcon />}
                  title="Shipping information"
                />

                {shipping ? (
                  <Stack spacing={2.5}>
                    <Box>
                      <DetailLabel>
                        Shipping address
                      </DetailLabel>

                      <Typography sx={{ fontWeight: 600 }}>
                        {shipping.fullName}
                      </Typography>

                      <Typography>
                        {shipping.address}
                      </Typography>

                      <Typography>
                        {shipping.city},{' '}
                        {shipping.province}{' '}
                        {shipping.postalCode}
                      </Typography>

                      <Typography>
                        {shipping.country}
                      </Typography>
                    </Box>

                    <Divider />

                    <DetailRow
                      label="Status"
                      value={
                        <Chip
                          size="small"
                          label={formatEnumLabel(
                            shipping.shippingStatus,
                          )}
                          color={getShippingStatusColor(
                            shipping.shippingStatus,
                          )}
                          variant="outlined"
                        />
                      }
                    />

                    <DetailRow
                      label="Tracking number"
                      value={
                        shipping.trackingNumber ||
                        'Not available yet'
                      }
                    />

                    {order.deliveredDate && (
                      <DetailRow
                        label="Delivered"
                        value={formatOrderDate(
                          order.deliveredDate,
                        )}
                      />
                    )}
                  </Stack>
                ) : (
                  <Typography color="text.secondary">
                    Shipping information is unavailable.
                  </Typography>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent sx={cardContentStyles}>
                <SectionHeading
                  icon={<CreditCardOutlinedIcon />}
                  title="Payment information"
                />

                {completedPayments.length === 0 &&
                scheduledPayments.length === 0 ? (
                  <Typography color="text.secondary">
                    Payment information is unavailable.
                  </Typography>
                ) : (
                  <Stack spacing={3}>
                    {completedPayments.length > 0 && (
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Completed payments
                        </Typography>

                        <Stack
                          spacing={2}
                          divider={<Divider flexItem />}
                        >
                          {completedPayments.map(
                            (payment) => (
                              <CompletedPaymentDetails
                                key={payment.id}
                                payment={payment}
                              />
                            ),
                          )}
                        </Stack>
                      </Box>
                    )}

                    {completedPayments.length > 0 &&
                      scheduledPayments.length > 0 && (
                        <Divider />
                      )}

                    {scheduledPayments.length > 0 && (
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 600,
                            mb: 2,
                          }}
                        >
                          Scheduled payments
                        </Typography>

                        <Stack
                          spacing={2}
                          divider={<Divider flexItem />}
                        >
                          {scheduledPayments.map(
                            (payment) => (
                              <ScheduledPaymentDetails
                                key={payment.id}
                                payment={payment}
                              />
                            ),
                          )}
                        </Stack>
                      </Box>
                    )}
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Box>

          <Card>
            <CardContent sx={cardContentStyles}>
              <Typography
                component="h2"
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                Order summary
              </Typography>

              <Stack spacing={2}>
                <DetailRow
                  label="Different products"
                  value={items.length}
                />

                <DetailRow
                  label="Total quantity"
                  value={totalQuantity}
                />

                <Divider />

                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="h6"
                    component="span"
                    sx={{ fontWeight: 600 }}
                  >
                    Order total
                  </Typography>

                  <Typography
                    variant="h5"
                    component="span"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 700,
                    }}
                  >
                    {formatCurrency(order.totalPrice)}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>
    </Box>
  );
};


interface CompletedPaymentDetailsProps {
  payment: CompletedPayment;
}

const CompletedPaymentDetails = ({ payment }: CompletedPaymentDetailsProps) => {
  const showInstallment = payment.totalInstallments > 1;
  return (
    <Stack spacing={1.25}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600 }}>
            {formatCurrency(
              payment.amount,
              payment.currency || 'CAD',
            )}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {formatEnumLabel(payment.paymentMethod)}
          </Typography>
        </Box>

        <Chip
          size="small"
          label={formatEnumLabel(payment.status)}
          color={getPaymentStatusColor(payment.status)}
          variant="outlined"
        />
      </Stack>

      <DetailRow
        label="Payment number"
        value={payment.paymentNumber}
      />

      <DetailRow
        label="Payment date"
        value={formatOrderDateTime(
          payment.createdDate,
        )}
      />

      {showInstallment && (
        <DetailRow
          label="Installment"
          value={`${payment.installment} of ${payment.totalInstallments}`}
        />
      )}

      {payment.usedStorePoints > 0 && (
        <DetailRow
          label="Store points used"
          value={payment.usedStorePoints}
        />
      )}

      {payment.awardedStorePoints > 0 && (
        <DetailRow
          label="Store points earned"
          value={payment.awardedStorePoints}
        />
      )}
    </Stack>
  );
};

interface ScheduledPaymentDetailsProps {
  payment: ScheduledPayment;
}

const ScheduledPaymentDetails = ({ payment }: ScheduledPaymentDetailsProps) => {
  const showInstallment = payment.totalInstallments > 1;
  return (
    <Stack spacing={1.25}>
      <Typography sx={{ fontWeight: 600 }}>
        {formatCurrency(
          payment.amount,
          payment.currency || 'CAD',
        )}
      </Typography>

      <DetailRow
        label="Payment method"
        value={formatEnumLabel(
          payment.paymentMethod,
        )}
      />

      <DetailRow
        label="Scheduled date"
        value={formatOrderDate(
          payment.paymentDate,
        )}
      />

      {showInstallment && (
        <DetailRow
          label="Installment"
          value={`${payment.installment} of ${payment.totalInstallments}`}
        />
      )}
    </Stack>
  );
};

interface SectionHeadingProps {
  icon: ReactNode;
  title: string;
}

const SectionHeading = ({ icon, title }: SectionHeadingProps) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: 'center',
        mb: 3,
        color: 'primary.main',
      }}
    >
      {icon}

      <Typography
        component="h2"
        variant="h5"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

interface DetailLabelProps {
  children: ReactNode;
}

const DetailLabel = ({ children }: DetailLabelProps) => {
  return (
    <Typography
      variant="caption"
      color="text.secondary"
      sx={{
        display: 'block',
        mb: 0.5,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      {children}
    </Typography>
  );
};

interface DetailRowProps {
  label: string;
  value: ReactNode;
}

const DetailRow = ({ label, value }: DetailRowProps) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography color="text.secondary">
        {label}
      </Typography>

      {typeof value === 'string' ||
      typeof value === 'number' ? (
        <Typography
          sx={{
            fontWeight: 500,
            textAlign: 'right',
            overflowWrap: 'anywhere',
          }}
        >
          {value}
        </Typography>
      ) : (
        value
      )}
    </Stack>
  );
};

const cardContentStyles = {
  p: {
    xs: 2.5,
    sm: 3,
    md: 4,
  },
  '&:last-child': {
    pb: {
      xs: 2.5,
      sm: 3,
      md: 4,
    },
  },
};

export default OrderDetails;
