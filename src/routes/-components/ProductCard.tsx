import { Link } from '@tanstack/react-router';
import type { ListingSummary } from '../../models/ListingSummary';
import WishlistButton from './WishlistButton';
import { Box, Typography } from '@mui/material';

type ProductCardProps = {
  listing: ListingSummary;
};

const ProductCard = ({ listing }: ProductCardProps) => {
  
  return (
    <Box>
      <WishlistButton listingId={listing.id} />
      <Link to="/products/$listingId" params={{ listingId: listing.id }}>
        <Box>
          {listing.imageLink && <img src={listing.imageLink} alt={listing.productName} width={150} />}

          <Typography variant={'h2'}>{listing.productName}</Typography>
          <Typography>{listing.productDescription}</Typography>
          <Typography>Category: {listing.clothingCategory}</Typography>
          <Typography>Department: {listing.departmentCategory}</Typography>

          {listing.minPrice != listing.maxPrice && <Typography>Starting at: ${listing.minPrice.toFixed(2)}</Typography>}

          {listing.colors.length > 0 && <Typography>Available colors: {listing.colors.join(', ')}</Typography>}
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;
