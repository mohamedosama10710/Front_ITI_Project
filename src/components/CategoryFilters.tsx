import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, RotateCcw, Filter } from 'lucide-react';
import type { FilterState } from '@/types/category';

interface CategoryFiltersProps {
  currentCategory: string;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onClearFilters: () => void;
   onApplied?: () => void;
}

const CATEGORIES = [
  'gaming',
  'pets',
  'cameras',
  'laptops',
  'toys',
  'shoes',
  'clothing',
  
];

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  currentCategory,
  filters,
  onFilterChange,
  onClearFilters,
    onApplied,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleApplyAll = () => {
    onFilterChange(localFilters);
    onApplied?.()
  };

  const activeCat = (currentCategory || '').toLowerCase();

  return (
    <aside className="space-y-6 w-full mb-10">
      {/* Categories Section */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-text-2 border-b pb-2">Categories</h3>
        <ul className="space-y-1 text-sm">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCat === cat;
            return (
              <li key={cat}>
                <Link
                  to={`/category/${cat}`}
                  className={`capitalize block py-1.5 px-2 rounded transition-colors ${
                    isSelected
                      ? 'text-secondary-2 font-semibold bg-secondary/50'
                      : 'text-text-1 hover:text-text-2 hover:bg-gray-100'
                  }`}
                >
                  {cat}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-text-2 border-b pb-2">Price Filter</h3>
        <div className="flex items-center gap-2 text-sm">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1.5 text-text-1">$</span>
            <input
              type="number"
              min={0}
              value={localFilters.minPrice || ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  minPrice: Number(e.target.value) || 0,
                }))
              }
              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-secondary-2"
              placeholder="Min"
            />
          </div>
          <span className="text-text-1">-</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1.5 text-text-1">$</span>
            <input
              type="number"
              min={0}
              value={localFilters.maxPrice || ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  maxPrice: Number(e.target.value) || 5000,
                }))
              }
              className="w-full pl-6 pr-2 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-secondary-2"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-text-2 border-b pb-2">Rating</h3>
        <div className="space-y-1.5">
          {[4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() =>
                setLocalFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === stars ? 0 : stars,
                }))
              }
              className={`flex items-center justify-between w-full py-1.5 px-2 text-sm rounded transition-colors ${
                localFilters.minRating === stars
                  ? 'bg-secondary text-secondary-2 font-semibold border border-secondary-2'
                  : 'text-text-1 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center text-amber-500 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < stars ? 'fill-current' : 'text-gray-300'}`}
                  />
                ))}
                <span className="text-text-2 text-xs ml-1">& Up</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Availability / Stock Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg text-text-2 border-b pb-2">Availability</h3>
        <div className="space-y-2 text-sm">
          {[
            { label: 'All Items', value: 'all' },
            { label: 'In Stock', value: 'in-stock' },
            { label: 'Out of Stock', value: 'out-of-stock' },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-2.5 cursor-pointer text-text-1 hover:text-text-2">
              <input
                type="radio"
                name="stockStatus"
                checked={localFilters.stockStatus === option.value}
                onChange={() =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    stockStatus: option.value as FilterState['stockStatus'],
                  }))
                }
                className="w-4 h-4 accent-secondary-2 cursor-pointer"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          onClick={handleApplyAll}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-secondary-2 text-white font-medium rounded hover:bg-btn-hover transition-colors text-sm shadow-sm"
        >
          <Filter className="w-4 h-4" />
          <span>Apply Filters</span>
        </button>

        <button
          type="button"
          onClick={onClearFilters}
          className="flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-300 text-text-2 font-medium rounded hover:bg-gray-100 transition-colors text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Clear Filters</span>
        </button>
      </div>
    </aside>
  );
};