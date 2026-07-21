import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { wishlistQueryOptions } from '../../queries';
import { useRemoveWishlistMutation } from '../../mutations.ts';
import { Box, Button, Typography } from '@mui/material';

const WishlistPage = () => {
  const { data: wishlistItems, isLoading, isError, error } = useQuery(wishlistQueryOptions());

  const { mutate, isPending, variables } = useRemoveWishlistMutation();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant={'h1'}>Wishlist</Typography>
        <Typography>Loading wishlist...</Typography>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant={'h1'}>Wishlist</Typography>
        <Typography>Failed to load wishlist: {error.message}</Typography>
      </Box>
    );
  }

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant={'h1'}>Wishlist</Typography>
        <Typography>Your wishlist is empty.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <Typography variant={'h1'}>Wishlist</Typography>

      {wishlistItems.map((item) => {
        const isRemoving = isPending && variables === item.listingId;

        const hasPriceRange = item.minPrice !== item.maxPrice;

        return (
          <Box key={item.id}>
            <Link to="/products/$listingId" params={{ listingId: item.listingId }} className="link">
              <Typography variant={'h2'}>{item.productName}</Typography>

              {item.imageLink && <img src={item.imageLink} alt={item.productName} width={150} />}

              <Typography>{item.productDescription}</Typography>

              <Typography>
                {hasPriceRange
                  ? `$${item.minPrice.toFixed(2)} – $${item.maxPrice.toFixed(2)}`
                  : `$${item.minPrice.toFixed(2)}`}
              </Typography>
            </Link>

            <Button type="button" onClick={() => mutate(item.listingId)} disabled={isRemoving}>
              {isRemoving ? 'Removing...' : 'Remove from Wishlist'}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
};

export default WishlistPage;
