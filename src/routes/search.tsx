import { createFileRoute } from '@tanstack/react-router'
import SearchPage from './-components/SearchPage'





export const Route = createFileRoute('/search')({
  component: SearchPage,
  
  // validateSearch: ( search: Record<string, unknown>): => {
  //   return {
  //     keyword: (search.keyword ?? '') || '',
  //     pageNumber: (search.pageNumber ?? 1) || 1,
  //     pageSize: (search.pageSize ?? 10) || 10,
  //   }
  // }
})
