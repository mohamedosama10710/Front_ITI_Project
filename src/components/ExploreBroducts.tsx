import React from 'react';
import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../store/api/productApi';
import { ProductCard } from './ProductCard';

export const ExploreProducts: React.FC = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  // Display up to 8 products for the Home page exploration grid
  const displayedProducts = products.slice(0, 8);

  return (
    <section className="py-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-secondary-2 rounded-sm" />
            <span className="text-secondary-2 font-semibold text-sm sm:text-base">
              Our Products
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-text-2">
            Explore Our Products
          </h2>
        </div>
      </div>

      {/* Grid Content */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="h-72 bg-secondary animate-pulse rounded-md" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-secondary-2 font-medium">
          Failed to load products.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* CTA Button */}
      <div className="mt-10 text-center">
        <Link
          to="/category/electronics"
          className="inline-block bg-secondary-2 text-text font-medium text-base px-12 py-4 rounded hover:bg-btn-hover transition-colors duration-200"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};