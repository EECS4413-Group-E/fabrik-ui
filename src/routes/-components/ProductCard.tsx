import { Link } from '@tanstack/react-router';
import type { T } from '../../models/Listing';
import WishlistButton from './WishlistButton';
import { Box, Typography } from '@mui/material';

type ProductCardProps = {
  listing: T;
};

const ProductCard = ({ listing }: ProductCardProps) => {
  const firstProduct = listing.products[0];
  const firstImage = firstProduct?.images[0];

  const prices = listing.products.map((product) => product.price);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;

  const colors = listing.products.map((product) => product.colorName);

  return (
    <Box>
      <WishlistButton listingId={listing.id} />
      <Link to="/products/$listingId" params={{ listingId: listing.id }}>
        <Box>
          {firstImage && <img src={firstImage.imageLink} alt={listing.productName} width={150} />}

          <Typography variant={'h2'}>{listing.productName}</Typography>
          <Typography>{listing.productDescription}</Typography>
          <Typography>Category: {listing.clothingCategory}</Typography>
          <Typography>Department: {listing.departmentCategory}</Typography>

          {lowestPrice !== null && <Typography>Starting at: ${lowestPrice.toFixed(2)}</Typography>}

          {colors.length > 0 && <Typography>Available colors: {colors.join(', ')}</Typography>}
        </Box>
      </Link>
    </Box>
  );
};

export default ProductCard;
