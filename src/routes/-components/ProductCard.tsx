import { Link } from '@tanstack/react-router';
import { Box, Breadcrumbs, Chip, CircularProgress, IconButton, Tooltip, Typography } from '@mui/material';
import { ClothingCategory } from '../../models/Filter';
import { DepartmentCategory } from '../../models/Filter';
import { useRemoveWishlistMutation } from '../../mutations';
import { fabrikColors } from '../../theme';

import FavoriteIcon from '@mui/icons-material/Favorite';

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

const ProductCard = ({
  id,
  productName,
  imageLink,
  discountPercentage,
  minPrice,
  maxPrice,
  departmentCategory,
  clothingCategory,
}: {
  id: string;
  productName: string;
  imageLink: string;
  discountPercentage?: number;
  minPrice: number;
  maxPrice: number;
  departmentCategory: DepartmentCategory;
  clothingCategory: ClothingCategory;
}) => {
  const {
    mutate: removeWishlistItem,
    isPending: isRemoving,
    variables: removingListingId,
  } = useRemoveWishlistMutation();
  const itemIsRemoving = isRemoving && removingListingId === id;
  const hasPriceRange = minPrice !== maxPrice;
  const discountedPrice =
    discountPercentage && discountPercentage > 0 ? minPrice * (1 - discountPercentage / 100) : null;

  return (
    <Box component="article" key={id} sx={{ minWidth: 0, backgroundColor: fabrikColors.linen }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#eeeae3',
          aspectRatio: '3 / 4',
        }}
      >
        <Link
          to="/products/$listingId"
          params={{ listingId: id }}
          aria-label={`View ${productName}`}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
          }}
        >
          {imageLink ? (
            <Box
              component="img"
              src={imageLink}
              alt={productName}
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 250ms ease',
                '&:hover': { transform: 'scale(1.025)' },
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
              }}
            >
              <Typography color="text.secondary">Image unavailable</Typography>
            </Box>
          )}
        </Link>
        {discountPercentage && discountPercentage > 0 && (
          <Chip
            label={`-${discountPercentage}%`}
            color="primary"
            sx={{ height: 38, width: 80, position: 'absolute', top: 10, left: 10,zIndex: 1 }}
          />
        )}

        <Tooltip title={'Add to wishlist'} placement="right">
          <IconButton
            type="button"
            aria-label={`Remove ${productName} from wishlist`}
            title="Remove from wishlist"
            onClick={() => removeWishlistItem(id)}
            disabled={itemIsRemoving}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: 38,
              height: 38,
              borderRadius: 10,
              backgroundColor: 'hsla(38, 40%, 96%, 0.67)',
              color: '#bd7a4a',
              '&:hover': { backgroundColor: '#ffffff' },
              '&.Mui-disabled': { backgroundColor: 'rgba(248, 245, 239, 0.8)' },
            }}
          >
            {itemIsRemoving ? (
              <CircularProgress size={18} color="inherit" />
            ) : (
              <FavoriteIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ pt: 1.5, px: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Link
            to="/products/$listingId"
            params={{ listingId: id }}
            style={{ minWidth: 0, color: 'inherit', textDecoration: 'none' }}
          >
            <Typography
              sx={{
                color: 'text.primary',
                fontSize: '0.95rem',
                lineHeight: 1.4,
                '&:hover': {
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                },
              }}
            >
              {productName}
            </Typography>
          </Link>

          <Typography
            sx={{
              flexShrink: 0,
              fontSize: '0.95rem',
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            {hasPriceRange
              ? `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`
              : formatPrice(minPrice)}
          </Typography>
        </Box>
        <Breadcrumbs sx={{ py: 2 }} separator=">">
          <Typography color="text.secondary">{departmentCategory}</Typography>
          <Typography color="text.secondary">{clothingCategory}</Typography>
        </Breadcrumbs>
      </Box>
    </Box>
  );
};

export default ProductCard;
