import { createFileRoute } from "@tanstack/react-router";

import ShoppingCartPage from "./-components/ShoppingCartPage";

export const Route = createFileRoute("/cart")({
  component: ShoppingCartPage,
});