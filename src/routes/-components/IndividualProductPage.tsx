import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { singleListingQueryOptions } from "../../queries";
import { useAddCartItemMutation } from "../../mutations";
import type { Product } from "../../models/Listing";

import WishlistButton from "./WishlistButton";

type IndividualProductPageProps = {
  listingId: string;
};

const getErrorMessage = (error: unknown) => {
  const possibleApiError = error as {
    response?: {
      data?: {
        error?: string;
      };
    };
  };

  return (
    possibleApiError.response?.data?.error ??
    "Unable to add this item to the cart."
  );
};

const IndividualProductPage = ({
  listingId,
}: IndividualProductPageProps) => {
  const {
    data: listing,
    isError,
    isLoading,
    error,
  } = useQuery(singleListingQueryOptions(listingId));

  const addCartItemMutation = useAddCartItemMutation();

  const [selectedProductIndex, setSelectedProductIndex] =
    useState(0);

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <p>Loading product...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  if (!listing) {
    return <p>Product not found.</p>;
  }

  const selectedProduct: Product | undefined =
    listing.products[selectedProductIndex];

  if (!selectedProduct) {
    return <p>No product variations available.</p>;
  }

  const selectedImage = selectedProduct.images[0];

  const selectedAvailability =
    selectedProduct.availabilities.find(
      (availability) => availability.size === selectedSize,
    );

  const handleProductSelection = (index: number) => {
    setSelectedProductIndex(index);
    setSelectedSize("");
    setQuantity(1);
    addCartItemMutation.reset();
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
    setQuantity(1);
    addCartItemMutation.reset();
  };

  const handleQuantityChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextQuantity = Number(event.target.value);
    const maximumQuantity =
      selectedAvailability?.availability ?? 1;

    if (
      Number.isInteger(nextQuantity) &&
      nextQuantity >= 1 &&
      nextQuantity <= maximumQuantity
    ) {
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
    <main>
      <h1>{listing.productName}</h1>

      <WishlistButton listingId={listing.id} showText />

      {selectedImage && (
        <img
          src={selectedImage.imageLink}
          alt={listing.productName}
          width={300}
        />
      )}

      <p>{listing.productDescription}</p>
      <p>Category: {listing.clothingCategory}</p>
      <p>Department: {listing.departmentCategory}</p>

      <h2>Selected Color: {selectedProduct.colorName}</h2>
      <p>Color Category: {selectedProduct.colorCategory}</p>
      <p>Price: ${selectedProduct.price.toFixed(2)}</p>
      <p>SKU: {selectedProduct.sku}</p>

      <h3>Available Colors</h3>

      <div>
        {listing.products.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => handleProductSelection(index)}
            disabled={index === selectedProductIndex}
          >
            {product.colorName}
          </button>
        ))}
      </div>

      <h3>Select a Size</h3>

      <div>
        {selectedProduct.availabilities.map(
          (availability) => (
            <label
              key={availability.id}
              style={{
                display: "block",
                marginBottom: "8px",
              }}
            >
              <input
                type="radio"
                name="size"
                value={availability.size}
                checked={
                  selectedSize === availability.size
                }
                disabled={availability.availability < 1}
                onChange={() =>
                  handleSizeSelection(availability.size)
                }
              />

              {availability.size}:{" "}
              {availability.availability > 0
                ? `${availability.availability} available`
                : "Out of stock"}
            </label>
          ),
        )}
      </div>

      <br />

      <label htmlFor="cart-quantity">
        Quantity:
      </label>

      <input
        id="cart-quantity"
        type="number"
        min={1}
        max={selectedAvailability?.availability ?? 1}
        value={quantity}
        disabled={!selectedAvailability}
        onChange={handleQuantityChange}
      />

      <br />
      <br />

      <button
        type="button"
        disabled={
          !selectedAvailability ||
          addCartItemMutation.isPending
        }
        onClick={handleAddToCart}
      >
        {addCartItemMutation.isPending
          ? "Adding..."
          : "Add to Cart"}
      </button>

      {addCartItemMutation.isSuccess && (
        <p>
          Item added successfully.{" "}
          <Link to="/cart">View Cart</Link>
        </p>
      )}

      {addCartItemMutation.isError && (
        <p>
          <strong>Error:</strong>{" "}
          {getErrorMessage(addCartItemMutation.error)}
        </p>
      )}
    </main>
  );
};

export default IndividualProductPage;