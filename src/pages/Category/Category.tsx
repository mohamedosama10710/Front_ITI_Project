import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryProductsQuery } from '@/store/api/productApi';
import type { FilterState, SortOption } from '@/types/category';
import { CategoryHeader } from '@/components/CategoryHeader';
import { CategoryFilters } from '@/components/CategoryFilters';
import { CategoryProductGrid } from '@/components/CategoryProductGrid';
import { CategoryPagination } from '@/components/CategoryPagination';
import { MobileFilters } from '@/components/MobileFilters';

const INITIAL_FILTERS: FilterState = {
  minPrice: 0,
  maxPrice: 5000,
  minRating: 0,
  stockStatus: 'all',
  sort: 'popular',
};

export const Category: React.FC = () => {
  // قراءة param الـ URL مباشرة
  const { categoryName = 'gaming' } = useParams<{ categoryName: string }>();
  
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // إعادة تعيين الصفحة والفلاتر فور تغير قسم الكاتيجوري في الـ URL
  useEffect(() => {
    setPage(1);
    setFilters(INITIAL_FILTERS);
  }, [categoryName]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters(INITIAL_FILTERS);
    setPage(1);
  };

  // إرسال categoryName للـ Query مباشرة لضمان تحديث البيانات مع الـ URL
  const { data, isLoading, isError } = useGetCategoryProductsQuery({
    category: categoryName,
    page,
    perPage: 9,
    minPrice: filters.minPrice > 0 ? filters.minPrice : undefined,
    maxPrice: filters.maxPrice < 5000 ? filters.maxPrice : undefined,
    minRating: filters.minRating > 0 ? filters.minRating : undefined,
    stockStatus: filters.stockStatus !== 'all' ? filters.stockStatus : undefined,
    sort: filters.sort,
  });

  const products = data?.data || [];
  const totalItems = data?.items || 0;
  const totalPages = data?.pages || 1;
  const startIndex = totalItems > 0 ? (page - 1) * 9 + 1 : 0;
  const endIndex = Math.min(page * 9, totalItems);

  return (
    <main className="container mx-auto px-4 py-8">
      <CategoryHeader
        categoryName={categoryName}
        totalItems={totalItems}
        startIndex={startIndex}
        endIndex={endIndex}
        sort={filters.sort}
        onSortChange={(sort: SortOption) => handleFilterChange({ sort })}
      />

      <MobileFilters
        currentCategory={categoryName}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <CategoryFilters
            currentCategory={categoryName}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        <div className="lg:col-span-3">
          <CategoryProductGrid
            products={products}
            isLoading={isLoading}
            isError={isError}
          />

          <CategoryPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </main>
  );
};

export default Category;