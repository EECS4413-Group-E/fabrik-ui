// src/routes/products/index.tsx
//
// Extended to accept an optional ?department= param so the navbar
// Men / Women / Other links can filter the products page.

import { createFileRoute } from '@tanstack/react-router';

import ProductsPage from '../-components/ProductsPage';
import { listingsQueryOptions } from '../../queries';

const DEPARTMENTS = ['MENS', 'WOMENS', 'OTHER'] as const;

type Department = (typeof DEPARTMENTS)[number];

type ProductSearch = {
  search?: string;
  department?: Department;
};

export const Route = createFileRoute('/products/')({
  validateSearch: (
    search: Record<string, unknown>,
  ): ProductSearch => {
    const searchTerm =
      typeof search.search === 'string'
        ? search.search.trim()
        : '';

    const departmentValue =
      typeof search.department === 'string'
        ? search.department.toUpperCase()
        : '';

    const department = DEPARTMENTS.find(
      (value) => value === departmentValue,
    );

    return {
      search: searchTerm || undefined,
      department,
    };
  },

  component: ProductsPage,

  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(
      listingsQueryOptions(),
    );
  },
});
