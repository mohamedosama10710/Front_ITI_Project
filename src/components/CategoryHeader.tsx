import React from 'react';
import { Link } from 'react-router-dom';
import type { SortOption } from '@/types/category';

interface CategoryHeaderProps {
  categoryName: string;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  totalItems,
  startIndex,
  endIndex,
  sort,
  onSortChange,
}) => {
  const formattedCategory = decodeURIComponent(categoryName)
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="space-y-4 mb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-text-1">
        <Link to="/" className="hover:text-text-2 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-text-2 font-medium capitalize">{formattedCategory}</span>
      </nav>

      {/* Title & Sort Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-wide text-text-2 capitalize">
            {formattedCategory}
          </h1>
          <p className="text-sm text-text-1 mt-1">
            {totalItems > 0
              ? `Showing ${startIndex}–${endIndex} of ${totalItems} Products`
              : 'No products found'}
          </p>
        </div>

        {/* Server-side Sorting Select */}
        <div className="flex items-center gap-3">
          <label htmlFor="sort-select" className="text-sm font-medium text-text-2 whitespace-nowrap">
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-secondary-2 cursor-pointer"
          >
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};