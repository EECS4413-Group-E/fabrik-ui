
import { createFileRoute, redirect } from "@tanstack/react-router";
import WishlistPage from "./-components/WishListPage";
import { wishlistQueryOptions } from "../queries";

export const Route = createFileRoute("/wishlist")({
  beforeLoad: ({ context: { isLoggedIn } }) => {
    if (!isLoggedIn) {
      throw redirect({ to: '/login' });
    }
  },
  component: WishlistPage,
  loader: ({ context: { queryClient } }) => {
    return queryClient.ensureQueryData(wishlistQueryOptions(true));
  },
});