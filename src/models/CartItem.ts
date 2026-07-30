export interface AddCartItemRequest {
  productId: string;
  size: string;
  quantity: number;
}

export interface UpdateCartItemQuantityRequest {
  productId: string;
  size: string;
  quantity: number;
}

export interface RemoveCartItemRequest {
  productId: string;
  size: string;
}

export interface CartItemReference {
  id: string;
  productId: string;
  size: string;
  quantity: number;
}

export interface CartItem extends CartItemReference {
  listingId: string;
  sku: string;
  name: string;
  description: string;
  colorName: string;
  imageLink: string | null;
  price: number;
  discountPercentage: number;
}