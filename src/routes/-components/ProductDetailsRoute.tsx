

import IndividualProductPage from "./IndividualProductPage";
import { Route } from "../products/$listingId";

const ProductDetailsRoute = () => {
  const { listingId } = Route.useParams();

  return <IndividualProductPage listingId={listingId} />;
};

export default ProductDetailsRoute;