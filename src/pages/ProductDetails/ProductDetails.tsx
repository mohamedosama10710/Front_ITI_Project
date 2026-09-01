import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import { useGetProductByIdQuery, useGetProductsByCategoryQuery } from '@/store/api/productApi';
import { ProductCard } from '@/components/ProductCard';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist } from '@/store/slices/wishlistSlice';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Redux States
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item.id === id);

  // RTK Query
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id || '');
  const { data: relatedProducts } = useGetProductsByCategoryQuery(
    product?.category || '',
    { skip: !product?.category }
  );

  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return <div className="container mx-auto py-16 text-center font-medium">Loading product...</div>;
  }

  if (isError || !product) {
    return <div className="container mx-auto py-16 text-center text-[#DB4444] font-medium">Product not found!</div>;
  }

  // Related products (Excluding current)
  const filteredRelated = relatedProducts?.filter((item) => item.id !== product.id).slice(0, 4) || [];

  const imageUrl = product.image.startsWith('/') || product.image.startsWith('http')
    ? product.image
    : `/${product.image}`;

  // Handlers
  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ product, quantity }));
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="capitalize hover:underline">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-black font-medium">{product.title}</span>
      </nav>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Thumbnails */}
        <div className="lg:col-span-2 flex lg:flex-col gap-4 order-2 lg:order-1">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className="bg-[#F5F5F5] rounded p-4 border border-transparent hover:border-black transition flex items-center justify-center cursor-pointer"
            >
              <img src={imageUrl} alt={product.title} className="max-h-20 object-contain" />
            </div>
          ))}
        </div>

        {/* Main Product Image */}
        <div className="lg:col-span-5 bg-[#F5F5F5] rounded-md p-8 flex items-center justify-center order-1 lg:order-2 min-h-[500px]">
          <img src={imageUrl} alt={product.title} className="w-[250px] h-[250px] object-contain " />
        </div>

        {/* Product Details Info */}
        <div className="lg:col-span-5 space-y-4 order-3">
          <h1 className="text-2xl font-semibold tracking-wide text-black">{product.title}</h1>

          {/* Rating & Stock */}
          <div className="flex items-center gap-3 text-sm">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-gray-400">({product.reviewCount || 150} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className={product.stock > 0 ? 'text-green-500 font-medium' : 'text-red-500 font-medium'}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-semibold text-black">${product.price.toFixed(2)}</div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed border-b border-gray-300 pb-6">
            {product.description}
          </p>

          {/* Quantity, Buy Now, Add to Cart & Wishlist */}
          <div className="flex items-center gap-4 pt-2">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-400 rounded overflow-hidden">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-2.5 hover:bg-[#DB4444] hover:text-white transition text-black"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium text-black">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-2.5 bg-[#DB4444] text-white hover:bg-[#b93333] transition"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-[#DB4444] text-white py-2.5 rounded text-sm font-medium hover:bg-[#b93333] transition"
            >
              Buy Now
            </button>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              aria-label="Toggle Wishlist"
              className={`p-2.5 border rounded transition ${
                isWishlisted
                  ? 'bg-[#DB4444] text-white border-[#DB4444]'
                  : 'border-gray-400 text-black hover:bg-gray-100'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Delivery Details */}
          <div className="border border-gray-400 rounded divide-y divide-gray-400 mt-6">
            <div className="p-4 flex items-center gap-4">
              <Truck className="w-8 h-8 text-black" />
              <div>
                <h4 className="font-medium text-sm text-black">Free Delivery</h4>
                <p className="text-xs text-gray-600 underline cursor-pointer mt-1">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <RefreshCw className="w-8 h-8 text-black" />
              <div>
                <h4 className="font-medium text-sm text-black">Return Delivery</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Items Section */}
      <div className="space-y-6 pt-10 mb-12">
        <div className="flex items-center gap-3">
          <div className="w-4 h-8 bg-[#DB4444] rounded-sm" />
          <h2 className="text-[#DB4444] font-semibold text-sm">Related Item</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredRelated.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;