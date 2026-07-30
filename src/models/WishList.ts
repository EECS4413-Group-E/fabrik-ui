import type { ClothingCategory, ColorCategory, DepartmentCategory } from './Filter';

export interface WishListItem {
  id: string;
  listingId: string;
  productDescription: string;
  productName: string;
  discountPercentage: number;
  clothingCategory: ClothingCategory;
  departmentCategory: DepartmentCategory;
  colors: ColorCategory[];
  imageLink: string;
  minPrice: number;
  maxPrice: number;
  createdDate: string;
  averageRating: number;
  reviewCount: number;
}