import {  useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';

import { singleListingQueryOptions } from '../../queries';
import { useAddCartItemMutation } from '../../mutations';
import type { Product } from '../../models/Listing';
import type { Size } from '../../models/Size';

import ReviewsSection from './ReviewsSection';

import WishlistButton from './WishlistButton';
import {
  Box,
  Breadcrumbs,
  Button,
  CircularProgress,
  Divider,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import SizeSelectionButtonGroup from './individualProductPage/SizeSelectionButtonGroup';
import ImageSelectionList from './individualProductPage/ImageSelectionList';
import { fabrikColors } from '../../theme';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ColorSelectionButtonGroup from './individualProductPage/ColorSelectionButtonGroup';
import TimedSuccessAlert from './TimedSuccessAlert';
import TimedErrorAlert from './TimedErrorAlert';

type IndividualProductPageProps = {
  listingId: string;
};


const IndividualProductPage = ({ listingId }: IndividualProductPageProps) => {
  const { data: listing, isError, isLoading } = useQuery(singleListingQueryOptions(listingId));

  const addCartItemMutation = useAddCartItemMutation();
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState(1);

  if (!listing) {
    return <Typography>Product not found.</Typography>;
  }

  const [selectedProduct, setSelectedProduct] = useState<Product>(listing.products[0]);
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);

  if (!selectedProduct) {
    return <Typography>No product variations available.</Typography>;
  }

  const [selectedImage, setSelectedImage] = useState(selectedProduct.images[0]);

  const selectedAvailability = selectedProduct.availabilities.find(
    (availability) => availability.size === selectedSize,
  );

  const handleProductSelection = (index: number) => {
    const nextProduct = listing.products[index];
    setSelectedProductIndex(index);
    setSelectedProduct(nextProduct);
    setSelectedSize(undefined);
    setQuantity(1);
    setSelectedImage(nextProduct.images[0]);
  };

  const handleSizeSelection = (size: Size | undefined) => {
    setSelectedSize(size);
    setQuantity(1);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextQuantity = Number(event.target.value);
    const maximumQuantity = selectedAvailability?.availability ?? 1;

    if (nextQuantity < 1) {
      setQuantity(1);
      return;
    }
    if (nextQuantity > maximumQuantity) {
      setQuantity(maximumQuantity);
      return;
    }
    setQuantity(nextQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedAvailability) {
      return;
    }
    addCartItemMutation.mutate({
      id: crypto.randomUUID(),
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
    setSelectedSize(undefined);
    setQuantity(1);
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ mx: { md: 10, lg: 20, xl: 30 }, my: 5 }}>
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 10,
          }}
        >
          <CircularProgress sx={{ margin: 'auto' }} />
        </Box>
      )}
      {isError && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            my: 10,
          }}
        >
          <Typography variant="body1" color="error">
            We're really sorry, something went wrong.
          </Typography>
        </Box>
      )}
      {/* Main Content */}
      {!isLoading && !isError && (
        <Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { lg: '1fr', xl: 'auto auto' },
              gap: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Images section */}
            <Box>
              {/* Breadcrumbs Menu Selection*/}
              <Box>
                <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2, color: 'text.secondary' }}>
                  <Button onClick={() => navigate({ to: '/' })} sx={{ color: 'text.secondary' }}>
                    <Typography color="text.secondary">HOME</Typography>
                  </Button>
                  <Button
                    onClick={() =>
                      navigate({
                        to: '/products',
                        search: {
                          department: listing.departmentCategory,
                        },
                      })
                    }
                    sx={{ color: 'text.secondary' }}
                  >
                    <Typography color="text.secondary">{listing.departmentCategory}</Typography>
                  </Button>
                  <Button
                    onClick={() =>
                      navigate({
                        to: '/products',
                        search: {
                          department: listing.departmentCategory,
                          category: listing.clothingCategory,
                        },
                      })
                    }
                    sx={{ color: 'text.secondary' }}
                  >
                    <Typography color="text.secondary">{listing.clothingCategory}</Typography>
                  </Button>
                  <Typography color="text.primary">{listing.productName.toUpperCase()}</Typography>
                </Breadcrumbs>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  maxWidth: 600,
                  mx: 'auto',
                }}
              >
                {selectedImage && (
                  <img
                    src={selectedImage.imageLink}
                    alt={listing.productName}
                    width={600}
                    height={600}
                    style={{ objectFit: 'cover' }}
                  />
                )}
                <Box sx={{ my: 2, maxWidth: '100%' }}>
                  <ImageSelectionList
                    availableImages={selectedProduct.images}
                    selectedImage={selectedImage.imageLink}
                    handleImageSelection={(image) => {
                      setSelectedImage(image);
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Info section */}
            <Box sx={{ mx: { md: 2, lg: 5 }, my: 2 }}>
              {/* Product info + Price */}
              <Box>
                <Typography variant={'h1'}>{listing.productName}</Typography>
                <Typography variant={'body1'} sx={{ mb: 2, color: 'text.secondary' }}>
                  {listing.departmentCategory}
                </Typography>
                <Box>
                  <Box>
                    {listing.discountPercentage > 0 ? (
                      <Box sx={{ my: 5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography
                            variant={'h5'}
                            sx={{ my: 0, textDecoration: 'line-through', color: 'text.secondary' }}
                          >
                            ${selectedProduct.price.toFixed(2)}
                          </Typography>
                          <Typography variant={'h5'} sx={{ my: 0, color: 'red' }}>
                            {listing.discountPercentage}% OFF
                          </Typography>
                        </Box>
                        <Typography variant={'h4'} sx={{ my: 0 }}>
                          Now $
                          {(selectedProduct.price * (1 - listing.discountPercentage / 100)).toFixed(
                            2,
                          )}
                          !
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={{ my: 5 }}>
                        <Typography variant={'h4'} sx={{ my: 0 }}>
                          ${selectedProduct.price.toFixed(2)}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Rating
                      name="product rating"
                      defaultValue={listing.averageRating}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant={'body1'} sx={{ my: 0, alignItems: 'center' }}>
                      - {listing.reviewCount} review{listing.reviewCount !== 1 ? 's' : ''}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />

              {/* Color Selection */}
              <Box sx={{ my: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography
                    variant={'body1'}
                    sx={{ color: 'text.secondary', letterSpacing: 1.75 }}
                  >
                    COLOR -
                  </Typography>
                  <Typography variant={'body1'} sx={{ my: 3 }}>
                    {selectedProduct.colorName.toUpperCase()}
                  </Typography>
                </Box>
                <ColorSelectionButtonGroup
                  products={listing.products}
                  selectedProductIndex={selectedProductIndex}
                  handleProductSelection={handleProductSelection}
                />
              </Box>

              {/* Size Selection */}
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant={'body1'}
                  sx={{ color: 'text.secondary', my: 3, letterSpacing: 1.75 }}
                >
                  SIZE
                </Typography>
                <SizeSelectionButtonGroup
                  availabilities={selectedProduct.availabilities}
                  selectedSize={selectedSize}
                  handleSizeSelection={handleSizeSelection}
                />
                {!selectedSize ? (
                  <Typography
                    variant={'body2'}
                    sx={{ color: 'text.secondary', my: 0, letterSpacing: 1.75 }}
                  >
                    Please select a size.
                  </Typography>
                ) : (
                  <Typography
                    variant={'body2'}
                    sx={{ color: 'text.secondary', my: 0, letterSpacing: 1.75 }}
                  >
                    {`${selectedAvailability?.availability ?? 0} in stock.`}
                  </Typography>
                )}
              </Box>

              {/* Add To Bag +Wishlist */}
              <Box
                sx={{
                  my: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <TextField
                  id="cart-quantity"
                  value={quantity}
                  disabled={!selectedAvailability}
                  onChange={handleQuantityChange}
                  label={'Quantity:'}
                  size="small"
                  type="number"
                  autoComplete="off"

                  sx={{
                    width: 70,
                    '& .MuiInputBase-root': {
                      minHeight: 55,
                    },
                    '& .MuiInputBase-input': {
                      height: 55,
                      boxSizing: 'border-box',
                      py: 0,
                    },
                  }}
                />
                <Button
                  disabled={!selectedAvailability || addCartItemMutation.isPending}
                  onClick={handleAddToCart}
                  sx={{
                    ml: 2,
                    height: 55,
                    width: 400,
                    border: '0px solid black',
                    borderRadius: 0,
                    padding: 0,
                    ['&:disabled']: {
                      backgroundColor: fabrikColors.linen,
                      color: 'gray',
                    },
                    ['&:enabled']: {
                      backgroundColor: 'black',
                      color: 'white',
                    },
                  }}
                >
                  {addCartItemMutation.isPending ? (
                    'Adding...'
                  ) : (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                      }}
                    >
                      <ShoppingBagOutlinedIcon sx={{ mr: 1 }} />
                      <Typography>Add to Cart</Typography>
                    </Box>
                  )}
                </Button>
                <WishlistButton listingId={listing.id} showText />
              </Box>
              {/* Description */}
              <Box>
                <Typography variant={'body1'} sx={{ mb: 2 }}>
                  SKU: {selectedProduct.sku}
                </Typography>
                <Typography variant={'body1'} sx={{ mb: 2, color: 'text.secondary' }}>
                  {listing.productDescription}
                </Typography>
              </Box>
              {/* Cart Alert */}
              <Box sx={{ my: 2, minHeight: 50 }}>

              {addCartItemMutation.isSuccess && (
                <TimedSuccessAlert/>
              )}

              {addCartItemMutation.isError && (
                <TimedErrorAlert/>
              )}
              </Box>
            </Box>
          </Box>
          {/* Reviews */}
          <Box sx={{ mx: { md: 10, lg: 20, xl: 30 } }}>
            <ReviewsSection listingId={listing.id} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default IndividualProductPage;
