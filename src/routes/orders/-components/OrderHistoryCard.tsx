import { Link } from '@tanstack/react-router';

import { Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';

import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

import ProductImage from './ProductImage.tsx';

import { fabrikColors } from '../../../theme.ts';
import type { Order } from '../../../models/Order.ts';

import {
  formatCurrency,
  formatEnumLabel,
  formatOrderDate,
  getShippingStatusColor,
  getTotalQuantity,
} from '../-utils/orderUtils.ts';

interface OrderHistoryCardProps {
  order: Order;
}

const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => {
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
                    color: fabrikColors.terracottaDark,
                  }}
                />

                <Typography variant="h5" component="h2">
                  Order #{order.orderNumber}
                </Typography>
              </Stack>

              <Typography variant="body2" color="text.secondary">
                Placed {formatOrderDate(order.createdDate)}
              </Typography>
            </Box>

            <Chip
              icon={<LocalShippingOutlinedIcon />}
              label={formatEnumLabel(order.shippingDetails.shippingStatus)}
              color={getShippingStatusColor(order.shippingDetails.shippingStatus)}
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

                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {[
                    firstItem.colorName,
                    firstItem.size ? `Size ${firstItem.size}` : null,
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
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Plus {remainingItemCount}{' '}
                    {remainingItemCount === 1 ? 'other product' : 'other products'}
                  </Typography>
                )}
              </Box>
            </Stack>
          ) : (
            <Typography color="text.secondary">
              Product information is unavailable for this order.
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
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 3 }}>
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

                <Typography sx={{ fontWeight: 500 }}>{totalQuantity}</Typography>
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

            <Button variant="contained" endIcon={<ArrowForwardOutlinedIcon />}>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to={'/orders/$orderId'} params={{ orderId: order.id }}>
                View details
              </Link>
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OrderHistoryCard;