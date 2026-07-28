import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Rating,
  Tooltip,
  Typography,
} from '@mui/material';
import type { ListingItem } from '../../models/Listing';
import { Link } from '@tanstack/react-router';

import type { WishListItem } from '../../models/WishList';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';
import { useWishlistMutation } from '../../mutations';

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

const ListingCard = ({
  listing,
  isLoggedIn,
  wishlistItems,
}: {
  listing: ListingItem;
  isLoggedIn: boolean;
  wishlistItems: WishListItem[];
}) => {
  const isInWishlist = wishlistItems?.some((item) => item.listingId === listing.id) ?? false;

  const getWishlistTooltipText = () => {
    if (!isLoggedIn) {
      return 'Log in to add items to your wishlist';
    }
    return isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';
  };
  const { mutate, isPending } = useWishlistMutation(isInWishlist, listing.id);

  const getWishlistButtonIcon = () => {
    if (!isLoggedIn) {
      return <HeartBrokenOutlinedIcon />;
    }
    if (isPending) {
      return <CircularProgress size={20} />;
    }
    if (isInWishlist) {
      return <FavoriteIcon />;
    }
    return <FavoriteBorderIcon />;
  };
  const hasPriceRange = listing.minPrice !== listing.maxPrice;

  return (
    <Box component="article" key={listing.id} sx={{ minWidth: 0 }}>
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
          params={{ listingId: listing.id }}
          aria-label={`View ${listing.productName}`}
          style={{
            display: 'block',
            width: '100%',
            height: '100%',
            textDecoration: 'none',
          }}
        >
          {listing.imageLink ? (
            <Box
              component="img"
              src={listing.imageLink}
              alt={listing.productName}
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
        <Box>
          <Tooltip title={getWishlistTooltipText()} placement="right">
            <Button
              type="button"
              aria-label={`Remove from wishlist`}
              onClick={() => mutate()}
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 38,
                height: 38,
                minWidth: 38,
                minHeight: 38,
                backgroundColor: 'hsla(38, 40%, 96%, 0)',
                color: '#bd7a4a',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                '&:hover': { backgroundColor: '#ffffff00' },
                '&.Mui-disabled': { backgroundColor: 'rgba(248, 245, 239, 0.8)' },
              }}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                {getWishlistButtonIcon()}
              </Box>
            </Button>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ pt: 1.5 }}>
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
            params={{ listingId: listing.id }}
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
              {listing.productName}
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
              ? `${formatPrice(listing.minPrice)} – ${formatPrice(listing.maxPrice)}`
              : formatPrice(listing.minPrice)}
          </Typography>
        </Box>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}
        >
          <Breadcrumbs sx={{ py: 2 }} separator=">">
            <Typography color="text.secondary">{listing.departmentCategory}</Typography>
            <Typography color="text.secondary">{listing.clothingCategory}</Typography>
          </Breadcrumbs>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography>
                {listing.reviewCount} review{listing.reviewCount !== 1 ? 's' : ''}
            </Typography>
            <Rating
              name="half-rating-read"
              defaultValue={listing.averageRating}
              precision={0.5}
              readOnly
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ListingCard;
