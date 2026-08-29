import React from 'react';
import { Link } from 'react-router-dom';
import { useGetBestSellingQuery } from '../store/api/productApi';
import { ProductCard } from './ProductCard';

export const BestSelling: React.FC = () => {
  const { data: products = [], isLoading, isError } = useGetBestSellingQuery();

  return (
    <section className="py-8 border-b border-gray-200">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-secondary-2 rounded-sm" />
            <span className="text-secondary-2 font-semibold text-sm sm:text-base">
              This Month
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-text-2">
            Best Selling Products
          </h2>
        </div>

        {/* View All Button */}
        <Link
          to="/category/gaming"
          className="bg-secondary-2 text-text font-medium text-sm sm:text-base px-8 sm:px-12 py-3 sm:py-4 rounded hover:bg-btn-hover transition-colors duration-200 flex-shrink-0"
        >
          View All
        </Link>
      </div>

      {/* Product Content Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-72 bg-secondary animate-pulse rounded-md" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-secondary-2 font-medium">
          Failed to load best-selling products.
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-text-1">No best-selling items available.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};