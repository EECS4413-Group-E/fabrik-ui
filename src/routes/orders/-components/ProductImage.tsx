import { Box } from '@mui/material';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import { fabrikColors } from '../../../theme.ts';
import type { OrderItem } from '../../../models/Order.ts';

interface ProductImageProps {
  item: OrderItem;
  width?: {
    xs: string | number;
    sm: string | number;
  };
  height?: {
    xs: string | number;
    sm: string | number;
  };
}

const ProductImage = ({
  item,
  width = { xs: '100%', sm: 120 },
  height = { xs: 220, sm: 140 },
  }: ProductImageProps) => (
  <Box
    sx={{
      width,
      height,
      flexShrink: 0,
      overflow: 'hidden',
      display: 'grid',
      placeItems: 'center',
      backgroundColor: fabrikColors.parchment,
      border: `1px solid ${fabrikColors.border}`,
    }} >
    {item.imageLink ? (
      <Box
        component="img"
        src={item.imageLink}
        alt={item.name}
        loading="lazy"
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

export default ProductImage;