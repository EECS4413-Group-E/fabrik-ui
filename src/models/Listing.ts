import type { ClothingCategory, ColorCategory, DepartmentCategory } from "./Filter";
import type { Size } from "./Size";

export interface Availability {
  id: string;
  size: Size;
  availability: number;
}

export interface ProductImage {
  id: string;
  imageLink: string;
}

export interface Product {
  id: string;
  colorCategory: ColorCategory;
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
  clothingCategory: ClothingCategory;
  departmentCategory: DepartmentCategory;
  products: Product[];
  discountPercentage: number;
  averageRating: number;
  reviewCount: number;

}

export interface ListingItem {
  id: string;
  productDescription: string;
  productName: string;
  clothingCategory: ClothingCategory;
  departmentCategory: DepartmentCategory;
  colors: string[];
  imageLink: string;
  minPrice: number;
  maxPrice: number;
  createdDate: string;
  averageRating: number;
  reviewCount: number;
}
