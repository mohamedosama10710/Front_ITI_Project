import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  Shirt,
  Sparkles,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { useGetProductsQuery } from '../store/api/productApi';

interface CategoryItem {
  id: string;
  name: string;
  icon: React.ElementType;
}

export const BrowseCategories: React.FC = () => {
  const { data: products = [], isLoading } = useGetProductsQuery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Icon mapping for categories
  const getCategoryIcon = (categoryName: string): React.ElementType => {
    const name = categoryName.toLowerCase();
    if (name.includes('phone') || name.includes('mobile')) return Smartphone;
    if (name.includes('electronic') || name.includes('monitor') || name.includes('laptop')) return Monitor;
    if (name.includes('watch')) return Watch;
    if (name.includes('camera')) return Camera;
    if (name.includes('headphone') || name.includes('audio')) return Headphones;
    if (name.includes('gaming')) return Gamepad2;
    if (name.includes('fashion') || name.includes('clothing') || name.includes('coat')) return Shirt;
    return Sparkles;
  };

  // Derive unique categories dynamically
  const uniqueCategoryNames = Array.from(
    new Set(products.map((p) => p.category))
  ).filter(Boolean);

  // Default visual list matching Figma if API is loading or empty
  const defaultCategoryList: CategoryItem[] = [
    { id: '1', name: 'Phones', icon: Smartphone },
    { id: '2', name: 'Computers', icon: Monitor },
    { id: '3', name: 'SmartWatch', icon: Watch },
    { id: '4', name: 'Camera', icon: Camera },
    { id: '5', name: 'HeadPhones', icon: Headphones },
    { id: '6', name: 'Gaming', icon: Gamepad2 },
  ];

  const categoriesToRender: CategoryItem[] =
    uniqueCategoryNames.length > 0
      ? uniqueCategoryNames.map((name, idx) => ({
          id: String(idx + 1),
          name,
          icon: getCategoryIcon(name),
        }))
      : defaultCategoryList;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-8 border-b border-gray-200">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-5 h-10 bg-secondary-2 rounded-sm" />
            <span className="text-secondary-2 font-semibold text-sm sm:text-base">
              Categories
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-text-2">
            Browse By Category
          </h2>
        </div>

        {/* Arrow Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous categories"
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-text-2 hover:bg-secondary-2 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next categories"
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-text-2 hover:bg-secondary-2 hover:text-white transition-colors duration-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Grid / Slider */}
      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="h-36 bg-secondary animate-pulse rounded-md" />
          ))}
        </div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categoriesToRender.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                to={`/category/${encodeURIComponent(cat.name.toLowerCase())}`}
                className="group flex-shrink-0 w-[140px] sm:w-[170px] h-[145px] border border-gray-300 rounded-md flex flex-col items-center justify-center gap-4 hover:bg-secondary-2 hover:border-secondary-2 transition-all duration-200"
              >
                <IconComponent className="w-10 h-10 text-text-2 group-hover:text-white transition-colors duration-200" />
                <span className="text-sm sm:text-base font-normal text-text-2 group-hover:text-white transition-colors duration-200 truncate max-w-[120px]">
                  {cat.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};