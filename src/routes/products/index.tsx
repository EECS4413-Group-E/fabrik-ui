import { createFileRoute } from '@tanstack/react-router';

import ProductsPage from '../-components/ProductsPage';
import { listingsQueryOptions } from '../../queries';

type ProductSearch = {
  search?: string;
};

export const Route = createFileRoute('/products/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): ProductSearch => {
    const searchTerm =
      typeof search.search === 'string'
        ? search.search.trim()
        : '';

    return {
      search: searchTerm || undefined,
    };
  },

  component: ProductsPage,

  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      listingsQueryOptions(),
    );
  },
});