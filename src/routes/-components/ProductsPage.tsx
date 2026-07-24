import { useQuery } from '@tanstack/react-query';
import { listingsQueryOptions } from '../../queries';
import ProductCard from './ProductCard';
import { Box, Typography } from '@mui/material';

const ProductsPage = () => {
  const { data: listings, isError, isLoading, error } = useQuery(listingsQueryOptions());

  return (
    <Box>
      <Typography variant={'h1'}>Products</Typography>

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography>Error: {error.message}</Typography>
      ) : listings?.length === 0 ? (
        <Typography>No products to display.</Typography>
      ) : (
        <Box>
          {listings?.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;
