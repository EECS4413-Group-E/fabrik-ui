import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

import { listingsQueryOptions } from '../../queries';
import ProductCard from './ProductCard';

const ProductsPage = () => {
  const { search } = useSearch({
    from: '/products/',
  });

  const {
    data: listings,
    isError,
    isLoading,
    error,
  } = useQuery(listingsQueryOptions());

  const searchTerm = search ?? '';
  const normalizedSearch =
    searchTerm.trim().toLowerCase();

  const filteredListings = (listings ?? []).filter(
    (listing) => {
      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        listing.productName,
        listing.productDescription,
        listing.clothingCategory,
        listing.departmentCategory,
        ...listing.products.flatMap((product) => [
          product.sku,
          product.colorName,
        ]),
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(
        normalizedSearch,
      );
    },
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        Products
      </Typography>

      {normalizedSearch && (
        <Typography sx={{ mb: 2 }}>
          Search results for:{' '}
          <strong>{searchTerm}</strong>
        </Typography>
      )}

      {isLoading ? (
        <Typography>Loading products...</Typography>
      ) : isError ? (
        <Typography color="error">
          Error: {error.message}
        </Typography>
      ) : filteredListings.length === 0 ? (
        <Typography>
          {normalizedSearch
            ? `No products matched "${searchTerm}".`
            : 'No products to display.'}
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 3,
          }}
        >
          {filteredListings.map((listing) => (
            <ProductCard
              key={listing.id}
              listing={listing}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProductsPage;