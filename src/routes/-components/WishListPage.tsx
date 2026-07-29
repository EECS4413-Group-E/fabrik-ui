import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { wishlistQueryOptions } from '../../queries';
import { Alert, Box, Button, CircularProgress, Divider, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ListingItem } from '../../models/Listing.ts';
import type { WishListItem } from '../../models/WishList.ts';
import ListingCard from './ListingCard.tsx';
import { useAuth } from '../../hooks/useAuth.ts';

function toListingItems(wishListItems: WishListItem[]): ListingItem[] {
  return wishListItems.map(({ id, listingId, ...rest }) => ({
    id: listingId,
    ...rest,
  }));
}

const WishlistPage = () => {
  const { data: wishlistItems, isLoading, isError, error } = useQuery(wishlistQueryOptions(true));

  const itemCount = wishlistItems?.length ?? 0;
  const { isLoggedIn } = useAuth();

  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        minHeight: 'calc(100vh - 72px)',
        backgroundColor: '#f8f5ef',
        color: '#1c1917',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1120,
          mx: 'auto',
          px: { xs: 2.5, sm: 4, md: 5 },
          pt: { xs: 5, md: 7 },
          pb: 8,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Box>
            <Typography
              component="h1"
              sx={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: { xs: '2.75rem', md: '3.5rem' },
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              Wishlist
            </Typography>

            {!isLoading && !isError && itemCount > 0 && (
              <Typography sx={{ mt: 1.25, fontSize: '0.875rem', color: 'text.secondary' }}>
                {itemCount} {itemCount === 1 ? 'item' : 'items'} saved
              </Typography>
            )}
          </Box>

          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBackIcon />}
            variant="text"
            sx={{
              color: 'text.primary',
              px: 0,
              minWidth: 0,
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              '&:hover': { backgroundColor: 'transparent', opacity: 0.65 },
            }}
          >
            Continue shopping
          </Button>
        </Box>

        <Divider sx={{ mt: { xs: 4, md: 5 }, mb: { xs: 5, md: 6 } }} />

        {isLoading && (
          <Box
            sx={{
              minHeight: 360,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <CircularProgress size={32} color="inherit" />
            <Typography color="text.secondary">Loading your wishlist...</Typography>
          </Box>
        )}

        {isError && (
          <Alert severity="error" sx={{ maxWidth: 600, mx: 'auto' }}>
            Failed to load your wishlist:{' '}
            {error instanceof Error ? error.message : 'An unexpected error occurred.'}
          </Alert>
        )}

        {!isLoading && !isError && itemCount === 0 && (
          <Box
            sx={{
              minHeight: { xs: 360, md: 430 },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              px: 2,
            }}
          >
            <FavoriteIcon sx={{ mb: 3, fontSize: 46, color: '#dedbd5' }} />

            <Typography
              component="h2"
              sx={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: { xs: '1.75rem', md: '2rem' },
                fontWeight: 400,
              }}
            >
              Your wishlist is empty
            </Typography>

            <Typography
              sx={{
                mt: 2,
                maxWidth: 340,
                color: 'text.secondary',
                fontSize: '0.875rem',
                lineHeight: 1.7,
              }}
            >
              Save items you love and come back to them whenever you are ready.
            </Typography>

            <Button
              component={Link}
              to="/products"
              variant="contained"
              disableElevation
              sx={{
                mt: 3.5,
                minWidth: 180,
                px: 3,
                py: 1.4,
                borderRadius: 0,
                backgroundColor: '#1c1917',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                '&:hover': { backgroundColor: '#38332e' },
              }}
            >
              Browse collection
            </Button>
          </Box>
        )}

        {!isLoading && !isError && itemCount > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
              },
              gap: { xs: 4, sm: 2.5 },
              alignItems: 'start',
            }}
          >
            {toListingItems(wishlistItems ?? []).map((item) => {
              return (
                <ListingCard
                  key={item.id}
                  listing={item}
                  isLoggedIn={isLoggedIn}
                  wishlistItems={wishlistItems ?? []}
                />
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WishlistPage;
