import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { wishlistQueryOptions } from '../../queries';
import { useRemoveWishlistMutation } from '../../mutations.ts';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

const WishlistPage = () => {
  const { data: wishlistItems, isLoading, isError, error } = useQuery(wishlistQueryOptions(true));

  const {
    mutate: removeWishlistItem,
    isPending: isRemoving,
    variables: removingListingId,
  } = useRemoveWishlistMutation();

  const itemCount = wishlistItems?.length ?? 0;

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
            {wishlistItems?.map((item) => {
              const itemIsRemoving = isRemoving && removingListingId === item.listingId;
              const hasPriceRange = item.minPrice !== item.maxPrice;

              return (
                <Box component="article" key={item.id} sx={{ minWidth: 0 }}>
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
                      params={{ listingId: item.listingId }}
                      aria-label={`View ${item.productName}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        textDecoration: 'none',
                      }}
                    >
                      {item.imageLink ? (
                        <Box
                          component="img"
                          src={item.imageLink}
                          alt={item.productName}
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

                    <IconButton
                      type="button"
                      aria-label={`Remove ${item.productName} from wishlist`}
                      title="Remove from wishlist"
                      onClick={() => removeWishlistItem(item.listingId)}
                      disabled={itemIsRemoving}
                      sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        width: 38,
                        height: 38,
                        borderRadius: 0,
                        backgroundColor: 'rgba(248, 245, 239, 0.94)',
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
                        params={{ listingId: item.listingId }}
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
                          {item.productName}
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
                          ? `${formatPrice(item.minPrice)} – ${formatPrice(item.maxPrice)}`
                          : formatPrice(item.minPrice)}
                      </Typography>
                    </Box>

                    {item.productDescription && (
                      <Typography
                        sx={{
                          mt: 0.5,
                          color: 'text.secondary',
                          fontSize: '0.8rem',
                          lineHeight: 1.5,
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 1,
                        }}
                      >
                        {item.productDescription}
                      </Typography>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default WishlistPage;
