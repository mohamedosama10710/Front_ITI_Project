import type { Product } from './product.types';

export interface PaginatedResponse<T> {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
}

export type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating-desc';

export interface CategoryQueryParams {
  category?: string;
  page?: number;
  perPage?: number;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  stockStatus?: 'in-stock' | 'out-of-stock';
  sort?: SortOption;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  minRating: number;
  stockStatus: 'all' | 'in-stock' | 'out-of-stock';
  sort: SortOption;
}