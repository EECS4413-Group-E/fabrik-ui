

import IndividualProductPage from "./IndividualProductPage";
import { Route } from "../products_.$listingId";

const ProductDetailsRoute = () => {
  const { listingId } = Route.useParams();

  return <IndividualProductPage listingId={listingId} />;
};

export default ProductDetailsRoute;