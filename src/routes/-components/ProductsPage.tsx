// src/routes/-components/ProductsPage.tsx
//
// Extended: filters by the optional ?department= param in addition to
// the existing keyword search, and shows a heading that reflects the
// selected department.

import { useQuery } from '@tanstack/react-query';
import { useSearch } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

import { listingsQueryOptions } from '../../queries';
import ProductCard from './ProductCard';

const DEPARTMENT_HEADINGS: Record<string, string> = {
  MENS: 'Men',
  WOMENS: 'Women',
  OTHER: 'Other',
};

const ProductsPage = () => {
  const { search, department } = useSearch({
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
      if (
        department &&
        listing.departmentCategory !== department
      ) {
        return false;
      }

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

  const heading = department
    ? DEPARTMENT_HEADINGS[department]
    : 'Products';

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" sx={{ mb: 2 }}>
        {heading}
      </Typography>

      {normalizedSearch && (
        <Typography sx={{ mb: 2 }}>
          Search results for:{' '}
          <strong>{searchTerm}</strong>
        </Typography>
      )}

      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : isError ? (
        <Typography>
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
            display: 'flex',
            flexWrap: 'wrap',
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
