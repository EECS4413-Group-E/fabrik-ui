import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { wishlistQueryOptions } from '../../queries';
import { useRemoveWishlistMutation } from '../../mutations.ts';

const WishlistPage = () => {
  const { data: wishlistItems, isLoading, isError, error } = useQuery(wishlistQueryOptions());

  const { mutate, isPending, variables } = useRemoveWishlistMutation();

  if (isLoading) {
    return (
      <main>
        <h1>Wishlist</h1>
        <p>Loading wishlist...</p>
      </main>
    );
  }

  if (isError) {
    return (
      <main>
        <h1>Wishlist</h1>
        <p>Failed to load wishlist: {error.message}</p>
      </main>
    );
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

      {wishlistItems.map((item) => {
        const isRemoving = isPending && variables === item.listingId;

        const hasPriceRange = item.minPrice !== item.maxPrice;

        return (
          <div key={item.id}>
            <Link to="/products/$listingId" params={{ listingId: item.listingId }} className="link">
              <h2>{item.productName}</h2>

              {item.imageLink && <img src={item.imageLink} alt={item.productName} width={150} />}

              <p>{item.productDescription}</p>

              <p>
                {hasPriceRange
                  ? `$${item.minPrice.toFixed(2)} – $${item.maxPrice.toFixed(2)}`
                  : `$${item.minPrice.toFixed(2)}`}
              </p>
            </Link>

            <button type="button" onClick={() => mutate(item.listingId)} disabled={isRemoving}>
              {isRemoving ? 'Removing...' : 'Remove from Wishlist'}
            </button>
          </div>
        );
      })}
    </main>
  );
};

export default WishlistPage;
