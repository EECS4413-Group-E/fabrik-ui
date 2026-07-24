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

export interface T {
  id: string;
  productName: string;
  productDescription: string;
  clothingCategory: string;
  departmentCategory: string;
  products: Product[];
}