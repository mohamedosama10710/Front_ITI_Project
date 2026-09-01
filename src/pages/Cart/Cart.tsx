import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:underline">Home</Link>
        <span>/</span>
        <span className="text-black font-medium">Cart</span>
      </nav>

      {/* Table Section */}
      <div className="overflow-x-auto shadow-sm border border-gray-100 rounded">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b text-sm font-normal py-4 px-6 text-black shadow-sm h-16">
              <th className="pl-8">Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="text-right pr-8">Subtotal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {cartItems.map((item) => {
              const imageUrl = item.product.image.startsWith('/') || item.product.image.startsWith('http')
                ? item.product.image
                : `/${item.product.image}`;

              return (
                <tr key={item.product.id} className="h-24 hover:bg-gray-50/50 transition">
                  <td className="pl-8">
                    <div className="flex items-center gap-4 relative group">
                      <button
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="w-5 h-5 bg-[#DB4444] text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition absolute -top-1 -left-2 z-10"
                      >
                        ✕
                      </button>
                      <img src={imageUrl} alt={item.product.title} className="w-12 h-12 object-contain" />
                      <span className="font-medium text-sm text-black truncate max-w-[200px]">
                        {item.product.title}
                      </span>
                    </div>
                  </td>
                  <td className="text-sm font-medium">${item.product.price}</td>
                  <td>
                    <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-1.5 w-20">
                      <span className="text-sm font-medium">
                        {String(item.quantity).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col justify-center gap-0.5">
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: item.quantity + 1 }))}
                          className="hover:text-[#DB4444]"
                        >
                          <ChevronUp className="w-3.5 h-3.5 text-black" />
                        </button>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.product.id, quantity: Math.max(1, item.quantity - 1) }))}
                          className="hover:text-[#DB4444]"
                        >
                          <ChevronDown className="w-3.5 h-3.5 text-black" />
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="text-right pr-8 text-sm font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-2">
        <Link
          to="/"
          className="px-8 py-3.5 border border-gray-400 rounded text-sm font-medium hover:bg-black hover:text-white transition"
        >
          Return To Shop
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3.5 border border-gray-400 rounded text-sm font-medium hover:bg-black hover:text-white transition"
        >
          Update Cart
        </button>
      </div>

      {/* Coupon & Total Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-6">
        {/* Coupon Code */}
        <div className="lg:col-span-6 flex gap-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border border-black rounded px-6 py-3 text-sm outline-none flex-1 max-w-[300px]"
          />
          <button className="bg-[#DB4444] text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#b93333] transition">
            Apply Coupon
          </button>
        </div>

        {/* Cart Total Box */}
        <div className="lg:col-span-6 lg:ml-auto w-full max-w-[470px] border-2 border-black rounded p-6 space-y-4">
          <h3 className="font-medium text-lg text-black">Cart Total</h3>

          <div className="space-y-3 divide-y divide-gray-200 text-sm">
            <div className="flex justify-between pt-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between pt-3 font-medium text-base">
              <span>Total:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            disabled={cartItems.length === 0}
            className="w-full bg-[#DB4444] text-white py-4 rounded text-sm font-medium hover:bg-[#b93333] transition disabled:opacity-50"
          >
            Proccess to checkout
          </button>
        </div>
      </div>
    </div>
  );
};