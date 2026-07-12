import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { addWishlistItem, removeWishlistItem} from "../../Api";
import {queryKeys,wishlistQueryOptions} from "../../queries";

type WishlistButtonProps = {
  listingId: string;
  showText?: boolean;
};

const WishlistButton = ({
  listingId,
  showText = false,
}: WishlistButtonProps) => {
  const queryClient = useQueryClient();

  const {
    data: wishlistItems,
    isLoading,
  } = useQuery(wishlistQueryOptions());

  const isInWishlist =
    wishlistItems?.some( (item) => item.listingId === listingId) ?? false;

  const wishlistMutation = useMutation({
    mutationFn: () => {
      if (isInWishlist) {
        return removeWishlistItem(listingId);
      }

      return addWishlistItem(listingId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.wishlist(),
      });
    },
  });

  const buttonText = isInWishlist
    ? "Remove from Wishlist"
    : "Add to Wishlist";

  return (
    <button
      type="button"
      onClick={() => wishlistMutation.mutate()}
      disabled={ isLoading || wishlistMutation.isPending }
      aria-label={buttonText}
      aria-pressed={isInWishlist}
    >
      <span aria-hidden="true">
        {isInWishlist ? "♥" : "♡"}
      </span>

      {showText && (
        <span>
          {wishlistMutation.isPending ? "Updating..." : buttonText}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;