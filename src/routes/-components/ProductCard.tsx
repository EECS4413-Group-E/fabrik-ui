

import { Link } from "@tanstack/react-router";
import type { Listing } from "../../models/Listing";
import WishlistButton from "./WishlistButton";


type ProductCardProps = {
  listing: Listing;
};

const ProductCard = ({ listing }: ProductCardProps) => {
  const firstProduct = listing.products[0];
  const firstImage = firstProduct?.images[0];

  const prices = listing.products.map((product) => product.price);
  const lowestPrice = prices.length > 0 ? Math.min(...prices) : null;

  const colors = listing.products.map((product) => product.colorName);

  return (
    <article>
      <WishlistButton listingId={listing.id} />
      <Link to="/products/$listingId" params={{ listingId: listing.id }}>
      <div>
        {firstImage && (
          <img src={firstImage.imageLink} alt={listing.productName} width={150} />
        )}

        <h2>{listing.productName}</h2>
        <p>{listing.productDescription}</p>
        <p>Category: {listing.clothingCategory}</p>
        <p>Department: {listing.departmentCategory}</p>

        {lowestPrice !== null && <p>Starting at: ${lowestPrice.toFixed(2)}</p>}

        {colors.length > 0 && <p>Available colors: {colors.join(", ")}</p>}
      </div>
    </Link>
    </article>
  );
};

export default ProductCard;