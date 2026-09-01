import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useGetProductsQuery } from "../store/api/productApi";
import { ProductCard } from "../components/ProductCard";
import { useCountdown } from "../hooks/useCountDown";

export const FlashSales: React.FC = () => {
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Target date set to 3 days from component initialization for live demo
  const targetDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  }, []);

  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <section className="py-8  border-b border-gray-200">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 lg:gap-12">
          {/* Section Indicator */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-5 h-10 bg-secondary-2 rounded-sm" />
              <span className="text-secondary-2 font-semibold text-sm sm:text-base">
                Today's
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-text-2">
              Flash Sales
            </h2>
          </div>

          {/* Live Countdown Display */}
          <div className="flex items-center gap-3 sm:gap-4 font-sans">
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-text-2 font-medium">Days</span>
              <span className="text-2xl sm:text-3xl font-bold text-text-2">{formatNumber(days)}</span>
            </div>
            <span className="text-secondary-2 text-2xl font-bold mt-3">:</span>
            
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-text-2 font-medium">Hours</span>
              <span className="text-2xl sm:text-3xl font-bold text-text-2">{formatNumber(hours)}</span>
            </div>
            <span className="text-secondary-2 text-2xl font-bold mt-3">:</span>

            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-text-2 font-medium">Minutes</span>
              <span className="text-2xl sm:text-3xl font-bold text-text-2">{formatNumber(minutes)}</span>
            </div>
            <span className="text-secondary-2 text-2xl font-bold mt-3">:</span>

            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-wider text-text-2 font-medium">Seconds</span>
              <span className="text-2xl sm:text-3xl font-bold text-text-2">{formatNumber(seconds)}</span>
            </div>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => scroll('left')}
            aria-label="Previous products"
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-text-2 hover:bg-secondary-2 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Next products"
            className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-text-2 hover:bg-secondary-2 hover:text-white transition-colors duration-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Content Carousel */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="h-72 bg-secondary animate-pulse rounded-md" />
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-10 text-secondary-2 font-medium">
          Failed to load flash sale products. Please check server connection.
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-10 text-text-1">No flash sale items available.</div>
      ) : (
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[260px] sm:min-w-[270px] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}

      {/* View All Products CTA */}
      <div className="mt-10 text-center">
        <Link
          to="/category/all"
          className="inline-block bg-secondary-2 text-text font-medium text-base px-12 py-4 rounded hover:bg-btn-hover transition-colors duration-200"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};