import { createFileRoute, type SearchSchemaInput } from '@tanstack/react-router';
import ProductsPage from '../-components/ProductsPage';
import { listingsQueryOptions } from '../../queries';
import type { ClothingCategory, DepartmentCategory } from '../../models/Filter';

type ProductsSearchInput = {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
  department?: DepartmentCategory;
  category?: ClothingCategory;
  deals?: boolean;
} & SearchSchemaInput;

type ProductsSearch = {
  keyword: string;
  pageNumber: number;
  pageSize: number;
  department: DepartmentCategory;
  category: ClothingCategory;
  deals: boolean;
};

export const Route = createFileRoute('/products/')({
  component: ProductsPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(listingsQueryOptions());
  },
  validateSearch: (search: ProductsSearchInput): ProductsSearch => {
    return {
      keyword: search.keyword || '',
      pageNumber: search.pageNumber || 0,
      pageSize: search.pageSize || 10,
      department: search.department || '',
      category: search.category || '',
      deals: search.deals || false,
    } as ProductsSearch;
  },
});
