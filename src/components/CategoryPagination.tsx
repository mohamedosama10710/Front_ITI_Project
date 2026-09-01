import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CategoryPagination: React.FC<CategoryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-20 mb-8">
      {/* Previous Page Button */}
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5 text-text-2" />
      </button>

      {/* Page Number Buttons */}
      {Array.from({ length: totalPages }).map((_, i) => {
        const pageNum = i + 1;
        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
              isActive
                ? 'bg-secondary-2 text-white font-bold'
                : 'border border-gray-300 hover:bg-gray-100 text-text-2'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5 text-text-2" />
      </button>
    </div>
  );
};