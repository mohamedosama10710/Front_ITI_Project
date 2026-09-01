import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { useGetProductsQuery } from '@/store/api/productApi';
import { ProductCard } from '@/components/ProductCard';

export const Wishlist: React.FC = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  
  // جلب كل المنتجات لعرض قسم Just For You (أول 4 منتجات كمثال)
  const { data: allProducts } = useGetProductsQuery();
  const justForYouProducts = allProducts?.slice(0, 4) || [];

  // نقل جميع عناصر الـ Wishlist إلى السلة
  const handleMoveAllToBag = () => {
    wishlistItems.forEach((product) => {
      dispatch(addToCart({ product, quantity: 1 }));
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* 1. Wishlist Header & Items */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-normal text-black">
            Wishlist ({wishlistItems.length})
          </h1>
          <button
            onClick={handleMoveAllToBag}
            disabled={wishlistItems.length === 0}
            className="px-8 py-3 border border-gray-400 rounded text-sm font-medium hover:bg-black hover:text-white transition disabled:opacity-50 cursor-pointer"
          >
            Move All To Bag
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-base">
            Your wishlist is currently empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {wishlistItems.map((product) => {
              const imageUrl = product.image.startsWith('/') || product.image.startsWith('http')
                ? product.image
                : `/${product.image}`;

              return (
                <div key={product.id} className="group relative w-full flex flex-col font-sans select-none">
                  {/* Upper Box */}
                  <div className="relative w-full aspect-square bg-[#F5F5F5] rounded-md overflow-hidden flex items-center justify-center p-6">
                    {/* Discount Badge */}
                    {product.discountPercentage && (
                      <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded">
                        -{product.discountPercentage}%
                      </span>
                    )}

                    {/* Trash Button */}
                    <button
                      onClick={() => dispatch(toggleWishlist(product))}
                      aria-label="Remove from wishlist"
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-[#DB4444] hover:text-white transition shadow-sm cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Image */}
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="max-h-full max-w-[180px] object-contain"
                    />

                    {/* Add To Cart Button */}
                    <button
                      onClick={() => dispatch(addToCart({ product, quantity: 1 }))}
                      className="absolute bottom-0 left-0 right-0 bg-black text-white text-sm font-medium py-2.5 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#DB4444] transition"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add To Cart
                    </button>
                  </div>

                  {/* Info */}
                  <div className="mt-4 flex flex-col gap-1.5 text-left">
                    <h3 className="font-medium text-base text-black truncate">
                      {product.title}
                    </h3>
                    <div className="flex items-center gap-3 text-base">
                      <span className="text-[#DB4444] font-medium">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 line-through text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Just For You Section */}
      <div className="space-y-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-4 h-8 bg-[#DB4444] rounded-sm" />
            <h2 className="text-xl font-normal text-black">Just For You</h2>
          </div>
          <Link
            to="/"
            className="px-8 py-3 border border-gray-400 rounded text-sm font-medium hover:bg-black hover:text-white transition"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {justForYouProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;