import { Link } from '@tanstack/react-router';
import { Box, Chip, Typography } from '@mui/material';

import type { Listing } from '../../models/Listing';
import { fabrikColors } from '../../theme';

type HomeProductCardProps = {
  listing: Listing;
};

const HomeProductCard = ({ listing }: HomeProductCardProps) => {
  const firstProduct = listing.products[0];
  const firstImage = firstProduct?.images[0];

  const prices = listing.products.map((product) => product.price);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;

  const discount = listing.discountPercentage ?? 0;

  const discountedPrice =
    lowestPrice !== null && discount > 0
      ? lowestPrice * (1 - discount / 100)
      : null;

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
          {firstImage && (
            <Box
              component="img"
              src={firstImage.imageLink}
              alt={listing.productName}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 500 }}>{listing.productName}</Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {listing.departmentCategory}
          </Typography>

          {lowestPrice !== null && (
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              {discountedPrice !== null ? (
                <>
                  <Typography sx={{ color: fabrikColors.terracotta, fontWeight: 500 }}>
                    ${discountedPrice.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                  >
                    ${lowestPrice.toFixed(2)}
                  </Typography>
                </>
              ) : (
                <Typography sx={{ fontWeight: 500 }}>${lowestPrice.toFixed(2)}</Typography>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Link>
  );
};

export default HomeProductCard;