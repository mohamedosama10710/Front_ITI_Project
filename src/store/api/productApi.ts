import { baseApi } from './baseApi';
import type { Product } from '../../types/product.types';
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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetFlashSalesQuery,
  useGetBestSellingQuery,
} = productsApi;