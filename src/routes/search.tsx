import { createFileRoute, type SearchSchemaInput } from '@tanstack/react-router';
import SearchPage from './-components/SearchPage';

type ProductsSearchInput = {
  keyword?: string;
  pageNumber?: number;
  pageSize?: number;
} & SearchSchemaInput;

type ProductsSearch = {
  keyword: string;
  pageNumber: number;
  pageSize: number;
};

export const Route = createFileRoute('/search')({
  component: SearchPage,

  validateSearch: (search: ProductsSearchInput): ProductsSearch => {
    return {
      keyword: search.keyword || '',
      pageNumber: search.pageNumber || 0,
      pageSize: search.pageSize || 10,
    } as ProductsSearch;
  },
});
