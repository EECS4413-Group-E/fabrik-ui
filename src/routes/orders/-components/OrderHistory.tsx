import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

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

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

import type {
  Order,
  OrderItem,
  ShippingStatusType,
} from '../../../models/Order.ts';
import { ShippingStatus } from '../../../models/Order.ts';
import { ordersQueryOptions } from '../../../queries.ts';
import { fabrikColors } from '../../../theme.ts';

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);

const formatOrderDate = (dateValue: string): string => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
};

const formatShippingStatus = (
  status: ShippingStatusType,
): string => {
  switch (status) {
    case ShippingStatus.Preparing:
      return 'Preparing';

    case ShippingStatus.Shipped:
      return 'Shipped';

    case ShippingStatus.Delivered:
      return 'Delivered';

    default:
      return status;
  }
};

const getShippingStatusColor = (
  status: ShippingStatusType,
): 'default' | 'info' | 'success' => {
  switch (status) {
    case ShippingStatus.Shipped:
      return 'info';

    case ShippingStatus.Delivered:
      return 'success';

    default:
      return 'default';
  }
};

const getTotalQuantity = (items: OrderItem[]): number =>
  items.reduce((total, item) => total + item.quantity, 0);

const OrderHistory = () => {
  const { data: orders } = useSuspenseQuery(
    ordersQueryOptions(),
  );

  const sortedOrders = [...orders].sort(
    (firstOrder, secondOrder) =>
      new Date(secondOrder.createdDate).getTime() -
      new Date(firstOrder.createdDate).getTime(),
  );

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        backgroundColor: 'background.default',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, md: 6 },
      }}
    >
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Stack spacing={1} sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography component="h1" variant="h1">
            My Orders
          </Typography>

          <Typography color="text.secondary">
            Review your previous purchases and check their
            delivery status.
          </Typography>
        </Stack>

        {sortedOrders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <Stack spacing={3}>
            {sortedOrders.map((order) => (
              <OrderHistoryCard
                key={order.id}
                order={order}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

interface OrderHistoryCardProps {
  order: Order;
}

const OrderHistoryCard = ({
  order,
}: OrderHistoryCardProps) => {
  const items = order.items ?? [];
  const firstItem = items[0];
  const remainingItemCount = Math.max(items.length - 1, 0);
  const totalQuantity = getTotalQuantity(items);

  return (
    <Card>
      <CardContent
        sx={{
          p: { xs: 2.5, sm: 3, md: 4 },
          '&:last-child': {
            pb: { xs: 2.5, sm: 3, md: 4 },
          },
        }}
      >
        <Stack spacing={3}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: {
                xs: 'flex-start',
                sm: 'center',
              },
            }}
          >
            <Box>
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: 'center',
                  mb: 0.75,
                }}
              >
                <ReceiptLongOutlinedIcon
                  fontSize="small"
                  sx={{
                    color:
                      fabrikColors.terracottaDark,
                  }}
                />

                <Typography
                  variant="h5"
                  component="h2"
                >
                  Order #{order.orderNumber}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                Placed {formatOrderDate(order.createdDate)}
              </Typography>
            </Box>

            <Chip
              icon={<LocalShippingOutlinedIcon />}
              label={formatShippingStatus(
                order.shippingDetails.shippingStatus,
              )}
              color={getShippingStatusColor(
                order.shippingDetails.shippingStatus,
              )}
              variant="outlined"
            />
          </Stack>

          <Divider />

          {firstItem ? (
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2.5}
              sx={{
                alignItems: {
                  xs: 'stretch',
                  sm: 'center',
                },
              }}
            >
              <ProductImage item={firstItem} />

              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    wordBreak: 'break-word',
                  }}
                >
                  {firstItem.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 0.5 }}
                >
                  {[
                    firstItem.colorName,
                    firstItem.size
                      ? `Size ${firstItem.size}`
                      : null,
                    `Quantity ${firstItem.quantity}`,
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  {formatCurrency(firstItem.price)}
                </Typography>

                {remainingItemCount > 0 && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    Plus {remainingItemCount}{' '}
                    {remainingItemCount === 1
                      ? 'other product'
                      : 'other products'}
                  </Typography>
                )}
              </Box>
            </Stack>
          ) : (
            <Typography color="text.secondary">
              Product information is unavailable for this
              order.
            </Typography>
          )}

          <Divider />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            sx={{
              justifyContent: 'space-between',
              alignItems: {
                xs: 'stretch',
                sm: 'center',
              },
            }}
          >
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={{ xs: 0.5, sm: 3 }}
            >
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Items
                </Typography>

                <Typography sx={{ fontWeight: 500 }}>
                  {totalQuantity}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{
                    display: 'block',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Order total
                </Typography>

                <Typography
                  variant="h5"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(order.totalPrice)}
                </Typography>
              </Box>
            </Stack>

            <Button
              component={Link}
              to="/orders/$orderId"
              params={{ orderId: order.id }}
              variant="contained"
              endIcon={<ArrowForwardOutlinedIcon />}
            >
              View details
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

interface ProductImageProps {
  item: OrderItem;
}

const ProductImage = ({ item }: ProductImageProps) => (
  <Box
    sx={{
      width: { xs: '100%', sm: 120 },
      height: { xs: 220, sm: 140 },
      flexShrink: 0,
      overflow: 'hidden',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: fabrikColors.parchment,
      border: `1px solid ${fabrikColors.border}`,
    }}
  >
    {item.imageLink ? (
      <Box
        component="img"
        src={item.imageLink}
        alt={item.name}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    ) : (
      <Inventory2OutlinedIcon
        sx={{
          fontSize: 42,
          color: 'text.secondary',
        }}
      />
    )}
  </Box>
);

const EmptyOrders = () => (
  <Card>
    <CardContent
      sx={{
        py: { xs: 6, md: 8 },
        textAlign: 'center',
      }}
    >
      <Inventory2OutlinedIcon
        sx={{
          fontSize: 56,
          color: fabrikColors.terracottaDark,
          mb: 2,
        }}
      />

      <Typography variant="h3" component="h2">
        No orders yet
      </Typography>

      <Typography
        color="text.secondary"
        sx={{
          mt: 1,
          maxWidth: 460,
          mx: 'auto',
        }}
      >
        Your completed purchases will appear here once you
        place an order.
      </Typography>

      <Button
        component={Link}
        to="/products"
        variant="contained"
        sx={{ mt: 3 }}
      >
        Start shopping
      </Button>
    </CardContent>
  </Card>
);

export default OrderHistory;