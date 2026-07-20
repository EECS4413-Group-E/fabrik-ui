import { useQuery } from '@tanstack/react-query';

import { wishlistQueryOptions } from '../../queries';
import { useWishlistMutation } from '../../mutations.ts';
import { Box, Button } from '@mui/material';

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
    <Button
      onClick={() => mutate()}
      disabled={isLoading || isPending}
      aria-label={buttonText}
      aria-pressed={isInWishlist}
    >
      <Box component={'span'} aria-hidden="true">
        {isInWishlist ? '♥' : '♡'}
      </Box>

      {showText && <Box component={'span'}>{isPending ? 'Updating...' : buttonText}</Box>}
    </Button>
  );
};

export default WishlistButton;
