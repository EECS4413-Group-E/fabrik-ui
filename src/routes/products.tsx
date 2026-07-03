

import { createFileRoute } from "@tanstack/react-router";
import ProductsPage from "./-components/ProductsPage";
import { listingsQueryOptions } from "../queries";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(listingsQueryOptions());
  },
});