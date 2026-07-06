import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { singleListingQueryOptions } from "../../queries";
import type { Product } from "../../models/Listing";

type IndividualProductPageProps = {
  listingId: string;
};

const IndividualProductPage = ({ listingId }: IndividualProductPageProps) => {
    const {
        data: listing,
        isError,
        isLoading,
        error,
    } = useQuery(singleListingQueryOptions(listingId));

    const [selectedProductIndex, setSelectedProductIndex] = useState(0);
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

    return (
        <main>
        <h1>{listing.productName}</h1>
        {selectedImage && (
            <img
            src={selectedImage.imageLink}
            alt={`${listing.productName}`}
            width={300}
            />
        )}
        <p>{listing.productDescription}</p>
        <p>Category: {listing.clothingCategory}</p>
        <p>Department: {listing.departmentCategory}</p>

        <h2>Selected Color: {selectedProduct.colorName}</h2>
        <p>Color Category: {selectedProduct.colorCategory}</p>
        <p>Price: ${selectedProduct.price}</p>
        <p>SKU: {selectedProduct.sku}</p>

        <h3>Available Colors</h3>
        <div>
            {listing.products.map((product, index) => (
            <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProductIndex(index)}
                disabled={index === selectedProductIndex}
            >
                {product.colorName}
            </button>
            ))}
        </div>
        <h3>Sizes</h3>
        <ul>
            {selectedProduct.availabilities.map((availability) => (
            <li key={availability.id}>
                {availability.size}: {availability.availability} available
            </li>
            ))}
        </ul>
        <button>Add to Cart</button>
        </main>
  );
};

export default IndividualProductPage;