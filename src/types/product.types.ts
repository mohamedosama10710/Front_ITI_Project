export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviewCount?: number;
  stock: number;
  isFlashSale?: boolean;
  isBestSelling?: boolean;
  isNewArrival?: boolean;
}