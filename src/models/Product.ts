


export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  size: string;
  color: string;
  available: boolean;
  stockQuantity?: number;
}