import {
  Box,
  Breadcrumbs,
  CircularProgress,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from '@mui/material';
import type { ListingItem } from '../../models/Listing';
import type { PageableResponse } from '../../models/PageableResponse';
import { useRemoveWishlistMutation } from '../../mutations';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from '@tanstack/react-router';

const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

const ListingsPageableSection = ({
  pageable,
  isLoading,
  isError,
  keyword,
  currentPage,
  setCurrentPage,
}: {
  pageable: PageableResponse<ListingItem> | undefined;
  isLoading: boolean;
  isError: boolean;
  keyword: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) => {
  const {
    mutate: removeWishlistItem,
    isPending: isRemoving,
    variables: removingListingId,
  } = useRemoveWishlistMutation();

  return (
    <Box>
      {/* Search results */}
      <Box>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress sx={{ margin: 'auto' }} />
          </Box>
        )}
        {!isLoading && !isError && pageable?.content?.length === 0 ? (
          <Box
            sx={{
              display: 'flex-column',
              justifyContent: 'center',
              alignItems: 'center',

              py: 20,
            }}
          >
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontSize: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              We don't have any results for "{keyword}"
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              sx={{
                fontSize: 30,
              }}
            >
              Try a different keyword, or change your filters to find what you're looking for.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, minmax(0, 1fr))',
                md: 'repeat(3, minmax(0, 1fr))',
                lg: 'repeat(4, minmax(0, 1fr))',
                xl: 'repeat(5, minmax(0, 1fr))',
              },
              gap: { xs: 4, sm: 2.5 },
              alignItems: 'start',
            }}
          >
            {pageable?.content?.map((item) => {
              const itemIsRemoving = isRemoving && removingListingId === item.id;
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
                      params={{ listingId: item.id }}
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
                    <Tooltip title={'Add to wishlist'} placement="right">
                      <IconButton
                        type="button"
                        aria-label={`Remove ${item.productName} from wishlist`}
                        title="Remove from wishlist"
                        onClick={() => removeWishlistItem(item.id)}
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
                        params={{ listingId: item.id }}
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
                    <Breadcrumbs sx={{ py: 2 }} separator=">">
                      <Typography color="text.secondary">{item.departmentCategory}</Typography>
                      <Typography color="text.secondary">{item.clothingCategory}</Typography>
                    </Breadcrumbs>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {pageable?.content?.length === 0 ? (
          <Box></Box>
        ) : (
          <Pagination
            count={pageable?.totalPages}
            page={currentPage + 1}
            onChange={(_, page) => setCurrentPage(page - 1)}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
          />
        )}
      </Box>
    </Box>
  );
};

export default ListingsPageableSection;
