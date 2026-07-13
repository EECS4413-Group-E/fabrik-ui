import { useQuery } from '@tanstack/react-query';

import { wishlistQueryOptions } from '../../queries';
import { useWishlistMutation } from '../../mutations.ts';

type WishlistButtonProps = {
  listingId: string;
  showText?: boolean;
};

const WishlistButton = ({ listingId, showText = false }: WishlistButtonProps) => {
  const { data: wishlistItems, isLoading } = useQuery(wishlistQueryOptions());

  const isInWishlist = wishlistItems?.some((item) => item.listingId === listingId) ?? false;

  const { mutate, isPending } = useWishlistMutation(isInWishlist, listingId);

  const buttonText = isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';

  return (
    <button
      type="button"
      onClick={() => mutate()}
      disabled={isLoading || isPending}
      aria-label={buttonText}
      aria-pressed={isInWishlist}
    >
      <span aria-hidden="true">{isInWishlist ? '♥' : '♡'}</span>

      {showText && <span>{isPending ? 'Updating...' : buttonText}</span>}
    </button>
  );
};

export default WishlistButton;
