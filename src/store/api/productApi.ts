import type { Product } from '../../types/product.types';
import type { CategoryQueryParams, PaginatedResponse } from '../../types/category';
import { baseApi } from './baseApi.js';

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Product', id }],
    }),
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `/products?category=${encodeURIComponent(category)}`,
      providesTags: ['Product'],
    }),
    getFlashSales: builder.query<Product[], void>({
      query: () => '/products?isFlashSale=true',
      providesTags: ['Product'],
    }),
    getBestSelling: builder.query<Product[], void>({
      query: () => '/products?isBestSelling=true',
      providesTags: ['Product'],
    }),
    // داخل endpoint: getCategoryProducts في ملف productsApi.ts

    getCategoryProducts: builder.query<PaginatedResponse<Product>, CategoryQueryParams>({
      query: (params) => {
        const queryParams = new URLSearchParams();

        // Pagination
        if (params.page) queryParams.set('_page', String(params.page));
        if (params.perPage) queryParams.set('_per_page', String(params.perPage));

        // Category Filter (تم توحيده بدون تكرار)
        if (params.category && params.category !== 'all') {
          queryParams.set('category', params.category.toLowerCase());
        }

        // Price Filters
        if (params.minPrice !== undefined && params.minPrice > 0) {
          queryParams.set('price_gte', String(params.minPrice));
        }
        if (params.maxPrice !== undefined && params.maxPrice < 5000) {
          queryParams.set('price_lte', String(params.maxPrice));
        }

        // Rating Filter
        if (params.minRating !== undefined && params.minRating > 0) {
          queryParams.set('rating_gte', String(params.minRating));
        }

        // Stock Filter
        if (params.stockStatus === 'in-stock') {
          queryParams.set('stock_gt', '0');
        } else if (params.stockStatus === 'out-of-stock') {
          queryParams.set('stock', '0');
        }

        // Sorting
        if (params.sort) {
          switch (params.sort) {
            case 'price-asc':
              queryParams.set('_sort', 'price');
              break;
            case 'price-desc':
              queryParams.set('_sort', '-price');
              break;
            case 'rating-desc':
            case 'popular':
              queryParams.set('_sort', '-rating');
              break;
          }
        }

        return `/products?${queryParams.toString()}`;
      },
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetFlashSalesQuery,
  useGetBestSellingQuery,
  useGetCategoryProductsQuery,
} = productsApi;