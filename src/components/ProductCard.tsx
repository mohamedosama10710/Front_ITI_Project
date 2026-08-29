import React from 'react';
import { Heart, Eye, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import type { Product } from '@/types/product.types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  // Render static 5-star rating layout
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, idx) => (
      <Star
        key={idx}
        className={`w-4 h-4 ${
          idx < Math.floor(product.rating)
            ? 'text-amber-500 fill-amber-500'
            : 'text-gray-300 fill-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="group relative w-full  flex flex-col font-sans select-none">
      {/* Upper Card Box */}
      <div className="relative w-full aspect-[4/3] sm:aspect-square bg-[#F5F5F5] rounded-md overflow-hidden flex items-center justify-center p-6">
        {/* Discount Badge */}
        {product.discountPercentage && (
          <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs font-normal px-3 py-1 rounded">
            -{product.discountPercentage}%
          </span>
        )}

        {/* Action Buttons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#DB4444] hover:text-white transition-colors duration-200 shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#DB4444] text-[#DB4444] group-hover:text-white group-hover:fill-white' : ''}`} />
          </button>
          <button
            aria-label="Quick view product details"
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#DB4444] hover:text-white transition-colors duration-200 shadow-sm"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full max-w-[190px] object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Add To Cart Button — Desktop Hover / Touch Mobile Visible */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm font-medium py-2.5 transition-all duration-300 opacity-100 sm:opacity-0 group-hover:opacity-100 translate-y-0 sm:translate-y-2 group-hover:translate-y-0 flex items-center justify-center"
        >
          Add To Cart
        </button>
      </div>

      {/* Product Details */}
      <div className="mt-4 flex flex-col gap-1.5 text-left">
        <h3 className="font-semibold text-base text-black truncate group-hover:text-[#DB4444] transition-colors">
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="flex items-center gap-3 text-base">
          <span className="text-[#DB4444] font-medium">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 line-through text-sm font-medium">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Rating Stars & Review Count */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">{renderStars()}</div>
          {product.reviewCount !== undefined && (
            <span className="text-xs text-gray-500 font-semibold">
              ({product.reviewCount})
            </span>
          )}
        </div>
      </div>
    </div>
  );
};