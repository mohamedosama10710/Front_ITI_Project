import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { CategoryFilters } from './CategoryFilters';
import type { FilterState } from '@/types/category';

interface MobileFiltersProps {
  currentCategory: string;
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

export const MobileFilters: React.FC<MobileFiltersProps> = ({
  currentCategory,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2.5 text-sm font-medium text-text-2 hover:bg-gray-50 transition-colors w-full justify-center shadow-sm"
      >
        <Filter className="w-4 h-4 text-secondary-2" />
        <span>Filter & Refine Products</span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl z-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b pb-4 mb-6">
                <h2 className="text-lg font-bold text-text-2">Filter Products</h2>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:text-text-2 hover:bg-gray-100 transition-colors"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <CategoryFilters
                currentCategory={currentCategory}
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={() => {
                  onClearFilters();
                  setIsOpen(false);
                }}
                onApplied={() => setIsOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};