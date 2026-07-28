export interface Availability {
  id: string;
  size: string;
  availability: number;
}

export interface ProductImage {
  id: string;
  imageLink: string;
}

export interface Product {
  id: string;
  colorCategory: string;
  colorName: string;
  price: number;
  sku: string;
  images: ProductImage[];
  availabilities: Availability[];
}

export interface Listing {
  id: string;
  productName: string;
  productDescription: string;
  clothingCategory: string;
  departmentCategory: string;
  products: Product[];
  discountPercentage?: number;
}

export interface ListingItem {
  id: string;
  productDescription: string;
  productName: string;
  clothingCategory: string;
  departmentCategory: string;
  colors: string[];
  imageLink: string;
  minPrice: number;
  maxPrice: number;
  createdDate: string;
  discountPercentage?: number;
}