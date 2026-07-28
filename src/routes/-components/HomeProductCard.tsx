import { Link } from '@tanstack/react-router';
import { Box, Chip, Typography } from '@mui/material';

import type { ListingItem } from '../../models/Listing';
import { fabrikColors } from '../../theme';

type HomeProductCardProps = {
  listing: ListingItem;
};

const HomeProductCard = ({ listing }: HomeProductCardProps) => {
  const discount = listing.discountPercentage ?? 0;

  const lowestPrice = listing.minPrice;

  const discountedPrice =
    discount > 0 ? lowestPrice * (1 - discount / 100) : null;

  return (
    <Link
      to="/products/$listingId"
      params={{ listingId: listing.id }}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: fabrikColors.linen,
          border: `1px solid ${fabrikColors.border}`,
          transition: 'transform 0.2s ease',
          '&:hover': { transform: 'translateY(-4px)' },
        }}
      >
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            color="primary"
            size="small"
            sx={{ position: 'absolute', top: 12, left: 12, zIndex: 1 }}
          />
        )}

        <Box
          sx={{
            width: '100%',
            aspectRatio: '3 / 4',
            backgroundColor: fabrikColors.parchment,
            overflow: 'hidden',
          }}
        >
          {listing.imageLink && (
            <Box
              component="img"
              src={listing.imageLink}
              alt={listing.productName}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>
            {listing.productName}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {listing.departmentCategory}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
            {discountedPrice !== null ? (
              <>
                <Typography
                  sx={{ color: fabrikColors.terracotta, fontWeight: 500 }}
                >
                  ${discountedPrice.toFixed(2)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'line-through',
                  }}
                >
                  ${lowestPrice.toFixed(2)}
                </Typography>
              </>
            ) : (
              <Typography sx={{ fontWeight: 500 }}>
                ${lowestPrice.toFixed(2)}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default HomeProductCard;