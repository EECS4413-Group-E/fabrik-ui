import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { singleListingQueryOptions } from '../../queries';
import { useAddCartItemMutation } from '../../mutations';
import type { Product } from '../../models/Listing';

import WishlistButton from './WishlistButton';
import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  toggleButtonGroupClasses,
  Typography,
} from '@mui/material';
import SizeSelectionButtonGroup from './individualProductPage/SizeSelectionButtonGroup';

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
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
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
      id: selectedProduct.id,
      price: selectedProduct.price,
      imageLink: selectedImage.imageLink,
      colorName: selectedProduct.colorName,
      description: listing.productDescription,
      name: listing.productName,
      sku: selectedProduct.sku,
      listingId: listingId,
      productId: selectedProduct.id,
      size: selectedSize,
      quantity,
    });
  };

  const navigate = useNavigate();


  return (
    <Box sx={{ mx: 10, my: 5 }}>
      {/* Breadcrumbs Menu Selection*/}
      <Box>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, color: 'text.secondary' }}>
          <Button onClick={() => navigate({ to: '/' })} sx={{ color: 'text.secondary' }}>
            <Typography color="text.secondary">HOME</Typography>
          </Button>
          <Button onClick={() => navigate({ to: '/products' })} sx={{ color: 'text.secondary' }}>
            <Typography color="text.secondary">

              {listing.departmentCategory}
            </Typography>
          </Button>
          <Button onClick={() => navigate({ to: '/products' })} sx={{ color: 'text.secondary' }}>
            <Typography color="text.secondary">

              {listing.clothingCategory}
            </Typography>
          </Button>
          <Typography color="text.primary">{listing.productName.toUpperCase()}</Typography>
        </Breadcrumbs>
      </Box>
      {/* Main Content */}
      <Box sx={{ display: 'Grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
        {/* Images section */}
        <Box>

          {selectedImage && <img src={selectedImage.imageLink} alt={listing.productName} width={300} />}
        </Box>

        {/* Info section */}
        <Box>
          {/* Product info + Price */}
          <Box>
            <Typography variant={'h1'}>{listing.productName}</Typography>
            <Typography variant={'body1'} sx={{ mb: 2, color: 'text.secondary' }}>
              {listing.departmentCategory}
            </Typography>
            <Typography variant={'h5'} sx={{ my: 5 }}>${selectedProduct.price.toFixed(2)}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />




          {/* Color Selection */}
          <Box sx={{ mb: 2 }}>
            <Typography variant={'body1'} sx={{ color: 'text.secondary' }}> COLOR - </Typography>
            
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
          </Box>







          {/* Size Selection */}
          <Box sx={{ mb: 2 }}>
            <Typography variant={'body1'} sx={{ color: 'text.secondary', my:3 }}> SIZE</Typography>
            <SizeSelectionButtonGroup
              availabilities={selectedProduct.availabilities}
              selectedSize={selectedSize}
              handleSizeSelection={handleSizeSelection}
            />
          </Box>




          {/* Add To Bag +Wishlist */}
          <Box>

          </Box>

            {listing.productDescription}
          <Typography>Category: {listing.clothingCategory}</Typography>

          <Typography variant={'h2'}>Selected Color: {selectedProduct.colorName}</Typography>
          <Typography>Color Category: {selectedProduct.colorCategory}</Typography>
          <Typography>SKU: {selectedProduct.sku}</Typography>

          <WishlistButton listingId={listing.id} showText />
          <Typography variant={'h3'}>Available Colors</Typography>
          <Typography variant={'body1'} sx={{ mb: 2, color: 'text.secondary' }}></Typography>



          <Typography variant={'h3'}>Select a Size</Typography>


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
      </Box>

      {/* Reviews */}
      <Divider sx={{ my: 2 }} />
      <Typography variant={'h3'}>Product Reviews</Typography>
    </Box>
  );
};

export default IndividualProductPage;
