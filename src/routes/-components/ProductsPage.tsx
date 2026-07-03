

import { useQuery } from "@tanstack/react-query";
import { listingsQueryOptions } from "../../queries";
import ProductCard from "./ProductCard";

const ProductsPage = () => {
  const {
    data: listings,
    isError,
    isLoading,
    error,
  } = useQuery(listingsQueryOptions());

  return (
    <div>
      <h1>Products</h1>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error: {error.message}</p>
      ) : listings?.length === 0 ? (
        <p>No products to display.</p>
      ) : (
        <div>
          {listings?.map((listing) => (
            <ProductCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;