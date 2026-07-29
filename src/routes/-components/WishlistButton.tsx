import { useQuery } from '@tanstack/react-query';

import { wishlistQueryOptions } from '../../queries';
import { useWishlistMutation } from '../../mutations.ts';
import { Box, Button, Tooltip } from '@mui/material';
import { useAuth } from '../../hooks/useAuth.ts';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HeartBrokenOutlinedIcon from '@mui/icons-material/HeartBrokenOutlined';

type WishlistButtonProps = {
  listingId: string;
  showText?: boolean;
};

const WishlistButton = ({ listingId }: WishlistButtonProps) => {
  const { isLoggedIn } = useAuth();
  const { data: wishlistItems, isLoading } = useQuery(wishlistQueryOptions(isLoggedIn));
  const isInWishlist = wishlistItems?.some((item) => item.listingId === listingId) ?? false;
  const { mutate, isPending } = useWishlistMutation(isInWishlist, listingId);

  const getWishlistTooltipText = () => {
    if (!isLoggedIn) {
      return 'Log in to add items to your wishlist';
    }
    return isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist';
  };

  const getWishlistButtonIcon = () => {
    if (!isLoggedIn) {
      return <HeartBrokenOutlinedIcon />;
    }
    if (isInWishlist) {
      return <FavoriteIcon />;
    }
    return <FavoriteBorderIcon />;
  };

  return (
    <Tooltip title={getWishlistTooltipText()}>
      <Button
        onClick={() => mutate()}
        disabled={isLoading || isPending}
        aria-label={getWishlistTooltipText()}
        aria-pressed={isInWishlist}
        sx={{ width: 55, height: 55, borderRadius: 0, padding: 0 }}
      >
        <Box
          component={'span'}
          aria-hidden="true"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {getWishlistButtonIcon()}
        </Box>
      </Button>
    </Tooltip>
  );
};

export default WishlistButton;
