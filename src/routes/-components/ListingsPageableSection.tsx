import {
  Box,
  CircularProgress,
  Pagination,
  Typography,
} from '@mui/material';
import type { ListingItem } from '../../models/Listing';
import type { PageableResponse } from '../../models/PageableResponse';
import ListingCard from './ListingCard';

import { useAuth } from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { wishlistQueryOptions } from '../../queries';

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
  const { isLoggedIn } = useAuth();
  const { data: wishlistItems } = useQuery(wishlistQueryOptions(isLoggedIn));

  return (
    <Box>
      {/* Search results */}
      <Box>
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 10,
            }}
          >
            <CircularProgress sx={{ margin: 'auto' }} />
          </Box>
        )}
        {isError && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 10,
            }}
          >
            <Typography variant="body1" color="error">
              We're really sorry, something went wrong.
            </Typography>
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
          <Box>
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
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {pageable?.content?.length !== 0 && (
                <Pagination
                  count={pageable?.totalPages}
                  page={currentPage + 1}
                  onChange={(event, page) => setCurrentPage(page - 1)}
                  defaultPage={1}
                  siblingCount={0}
                  boundaryCount={2}
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ListingsPageableSection;
