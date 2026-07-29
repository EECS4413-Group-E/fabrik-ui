import {
  Box,
  Chip,
  Stack,
  Typography,
} from '@mui/material';

import type { OrderItem } from '../../../models/Order.ts';

import ProductImage from './ProductImage.tsx';

import { formatCurrency, formatEnumLabel } from '../-utils/orderUtils.ts';

interface OrderDetailsItemProps {
  item: OrderItem;
}

const OrderDetailsItem = ({ item }: OrderDetailsItemProps) => {
  const itemTotal = item.price * item.quantity;

  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      spacing={2.5}
      sx={{
        alignItems: {
          xs: 'stretch',
          sm: 'flex-start',
        },
      }}
    >
      <ProductImage
        item={item}
        width={{ xs: '100%', sm: 160 }}
        height={{ xs: 260, sm: 190 }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={1.5}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography
              variant="h6"
              component="h3"
              sx={{ fontWeight: 600 }}
            >
              {item.name}
            </Typography>

            {item.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.75,
                  maxWidth: 650,
                }}
              >
                {item.description}
              </Typography>
            )}
          </Box>

          <Typography
            variant="h6"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            {formatCurrency(itemTotal)}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{
            flexWrap: 'wrap',
            mt: 2,
          }}
        >
          {item.colorName && (
            <Chip
              size="small"
              variant="outlined"
              label={`Color: ${item.colorName}`}
            />
          )}

          {item.size && (
            <Chip
              size="small"
              variant="outlined"
              label={`Size: ${formatEnumLabel(item.size)}`}
            />
          )}

          {item.sku && (
            <Chip
              size="small"
              variant="outlined"
              label={`SKU: ${item.sku}`}
            />
          )}
        </Stack>

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={{
            xs: 1,
            sm: 4,
          }}
          sx={{ mt: 2 }}
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
              Quantity
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>
              {item.quantity}
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
              Price per item
            </Typography>

            <Typography sx={{ fontWeight: 500 }}>
              {formatCurrency(item.price)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default OrderDetailsItem;