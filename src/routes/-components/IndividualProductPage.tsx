import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { singleListingQueryOptions } from '../../queries';
import { useAddCartItemMutation } from '../../mutations';
import type { Product } from '../../models/Listing';

import WishlistButton from './WishlistButton';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';

type IndividualProductPageProps = {
  listingId: string;
};

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        message?: string;
        error?: string;
      };
    };
  };

  return (
    possibleApiError.response?.data?.message ??
    possibleApiError.response?.data?.error ??
    'Unable to add this item to the cart.'
  );
};

const IndividualProductPage = ({ listingId }: IndividualProductPageProps) => {
  const {
    data: listing,
    isError,
    isLoading,
    error,
  } = useQuery(singleListingQueryOptions(listingId));

  const addCartItemMutation = useAddCartItemMutation();

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <Typography>Loading product...</Typography>;
  }

  if (isError) {
    return <Typography>Error: {error.message}</Typography>;
  }

  if (!listing) {
    return <Typography>Product not found.</Typography>;
  }

  const selectedProduct: Product | undefined = listing.products[selectedProductIndex];

  if (!selectedProduct) {
    return <Typography>No product variations available.</Typography>;
  }

  const selectedImage = selectedProduct.images[0];

  const selectedAvailability = selectedProduct.availabilities.find(
    (availability) => availability.size === selectedSize,
  );

  const handleProductSelection = (index: number) => {
    setSelectedProductIndex(index);
    setSelectedSize('');
    setQuantity(1);
    addCartItemMutation.reset();
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    addCartItemMutation.reset();
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuantity = Number(event.target.value);
    const maximumQuantity = selectedAvailability?.availability ?? 1;

    if (Number.isInteger(nextQuantity) && nextQuantity >= 1 && nextQuantity <= maximumQuantity) {
      setQuantity(nextQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedAvailability) {
      return;
    }

    addCartItemMutation.mutate({
      productId: selectedProduct.id,
      size: selectedSize,
      quantity,
    });
  };

  return (
    <Box>
      <Typography variant={'h1'}>{listing.productName}</Typography>

      <WishlistButton listingId={listing.id} showText />

      {selectedImage && <img src={selectedImage.imageLink} alt={listing.productName} width={300} />}

      <Typography>{listing.productDescription}</Typography>
      <Typography>Category: {listing.clothingCategory}</Typography>
      <Typography>Department: {listing.departmentCategory}</Typography>

      <Typography variant={'h2'}>Selected Color: {selectedProduct.colorName}</Typography>
      <Typography>Color Category: {selectedProduct.colorCategory}</Typography>
      <Typography>Price: ${selectedProduct.price.toFixed(2)}</Typography>
      <Typography>SKU: {selectedProduct.sku}</Typography>

      <Typography variant={'h3'}>Available Colors</Typography>

      <Box>
        {listing.products.map((product, index) => (
          <Button
            key={product.id}
            onClick={() => handleProductSelection(index)}
            disabled={index === selectedProductIndex}
          >
            {product.colorName}
          </Button>
        ))}
      </Box>

      <Typography variant={'h3'}>Select a Size</Typography>

      <Box>
        {selectedProduct.availabilities.map((availability) => (
          <RadioGroup
            name={'Size'}
            onChange={(e) => handleSizeSelection(e.target.value)}
            value={selectedSize}
            key={availability.size}
          >
            <FormControlLabel
              control={<Radio />}
              label={`${availability.size}:
              ${
                availability.availability > 0
                  ? availability.availability + 'available'
                  : 'Out of stock'
              }`}
              value={availability.size}
            />
          </RadioGroup>
        ))}
      </Box>
      <TextField
        id="cart-quantity"
        value={quantity}
        disabled={!selectedAvailability}
        onChange={handleQuantityChange}
        label={'Quantity:'}
      />
      <Button
        disabled={!selectedAvailability || addCartItemMutation.isPending}
        onClick={handleAddToCart}
      >
        {addCartItemMutation.isPending ? 'Adding...' : 'Add to Cart'}
      </Button>

      {addCartItemMutation.isSuccess && (
        <Typography>
          Item added successfully. <Link to="/cart">View Cart</Link>
        </Typography>
      )}

      {addCartItemMutation.isError && (
        <Typography color="error">
          <strong>Error:</strong> {getErrorMessage(addCartItemMutation.error)}
        </Typography>
      )}
    </Box>
  );
};

export default IndividualProductPage;
