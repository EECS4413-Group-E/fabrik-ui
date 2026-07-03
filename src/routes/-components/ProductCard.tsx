


import type { Listing } from "../../models/Listing";

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
    <div>
      {firstImage && (
        <img src={firstImage.imageLink} alt={listing.productName} width={150} />
      )}

      <h2>{listing.productName}</h2>
      <p>{listing.productDescription}</p>
      <p>Category: {listing.clothingCategory}</p>
      <p>Department: {listing.departmentCategory}</p>

      {lowestPrice !== null && <p>Starting at: ${lowestPrice}</p>}

      {colors.length > 0 && <p>Available colors: {colors.join(", ")}</p>}
    </div>
  );
};

export default ProductCard;