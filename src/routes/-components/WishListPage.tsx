
import { Link } from "@tanstack/react-router";
import { useMutation, useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { singleListingQueryOptions, queryKeys, wishlistQueryOptions } from "../../queries";
import { removeWishlistItem } from "../../Api";

const WishlistPage = () => {
  const queryClient = useQueryClient();

  const {
    data: wishlistItems,
    isLoading,
    isError,
    error,
  } = useQuery(wishlistQueryOptions());

  const listingQueries = useQueries({
    queries:
      wishlistItems?.map((item) => ({
        ...singleListingQueryOptions(item.listingId),
        enabled: !!item.listingId,
      })) ?? [],
  });

  const removeMutation = useMutation({
    mutationFn: removeWishlistItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.wishlist() });
    },
  });

  if (isLoading) {
    return <p>Loading wishlist...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <main>
        <h1>Wishlist</h1>
        <p>Your wishlist is empty.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Wishlist</h1>

      {wishlistItems.map((item, index) => {
        const listingQuery = listingQueries[index];
        const listing = listingQuery?.data;

        return (
          <div key={item.id}>
            {listingQuery?.isLoading ? (
              <p>Loading item...</p>
            ) : listingQuery?.isError ? (
              <p>Failed to load listing details.</p>
            ) : listing ? (
              <>
                <Link to="/products/$listingId" params={{ listingId: listing.id }} className="link">
                  <h2>{listing.productName}</h2>

                  {listing.products[0]?.images[0] && (
                    <img
                      src={listing.products[0].images[0].imageLink}
                      alt={listing.productName}
                      width={150}
                    />
                  )}

                  <p>{listing.productDescription}</p>
                  <p>Category: {listing.clothingCategory}</p>
                  <p>Department: {listing.departmentCategory}</p>

                  {listing.products.length > 0 && (
                    <p>
                      Starting at: $
                      {Math.min(...listing.products.map((product) => product.price))}
                    </p>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() => removeMutation.mutate(item.listingId)}
                  disabled={removeMutation.isPending}
                >
                  Remove from Wishlist
                </button>
              </>
            ) : (
              <p>Listing not found.</p>
            )}
          </div>
        );
      })}
    </main>
  );
};

export default WishlistPage;


