import React from 'react';
import { PackageSearch, AlertCircle } from 'lucide-react';
import type { Product } from '@/types/product.types';
import { ProductCard } from '@/components/ProductCard';

interface CategoryProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
}

export const CategoryProductGrid: React.FC<CategoryProductGridProps> = ({
  products,
  isLoading,
  isError,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {Array.from({ length: 9 }).map((_, idx) => (
          <div
            key={idx}
            className="rounded-md border border-gray-100 bg-white p-4 shadow-sm space-y-4 animate-pulse"
          >
            <div className="h-44 bg-gray-200 rounded-md w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-8 bg-gray-200 rounded w-full pt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-red-50/50 rounded-xl border border-red-100 space-y-3">
        <AlertCircle className="w-10 h-10 text-red-500" />
        <h3 className="text-lg font-semibold text-gray-900">Unable to load products</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Something went wrong while fetching products. Please try again or check your connection.
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-4 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50 space-y-3">
        <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
          <PackageSearch className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-text-2">No matching products found</h3>
        <p className="text-sm text-text-1 max-w-sm">
          We couldn't find any items matching your selected criteria. Try resetting your price or rating filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  mb-10">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};