
import { createFileRoute } from "@tanstack/react-router";
import ProductDetailsRoute from "../-components/ProductDetailsRoute";
import { singleListingQueryOptions } from "../../queries";

export const Route = createFileRoute("/products/$listingId")({
  component: ProductDetailsRoute,
  loader: ({ context: { queryClient }, params: { listingId } }) => {
    return queryClient.ensureQueryData(singleListingQueryOptions(listingId));
  },
});