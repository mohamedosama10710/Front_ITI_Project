import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/hooks';

export const CheckOut: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cod'>('cod');

  return (
    <div className="container mx-auto px-4 py-8 space-y-10 ">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-2">
        <Link to="/" className="hover:underline">Account</Link>
        <span>/</span>
        <Link to="/cart" className="hover:underline">View Cart</Link>
        <span>/</span>
        <span className="text-black font-medium">CheckOut</span>
      </nav>

      <h1 className="text-3xl font-medium tracking-wide">Billing Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-10">
        {/* Form Inputs */}
        <form className="lg:col-span-6 space-y-6 text-gray-400 text-sm">
          <div className="space-y-2">
            <label className="block text-gray-400">First Name<span className="text-[#DB4444]">*</span></label>
            <input type="text" required className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400">Company Name</label>
            <input type="text" className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400">Street Address<span className="text-[#DB4444]">*</span></label>
            <input type="text" required className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400">Apartment, floor, etc. (optional)</label>
            <input type="text" className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400">Town/City<span className="text-[#DB4444]">*</span></label>
            <input type="text" required className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400">Phone Number<span className="text-[#DB4444]">*</span></label>
            <input type="tel" required className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-400">Email Address<span className="text-[#DB4444]">*</span></label>
            <input type="email" required className="w-full bg-[#F5F5F5] rounded py-3 px-4 text-black outline-none" />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input type="checkbox" id="save-info" className="w-4 h-4 accent-[#DB4444] cursor-pointer" />
            <label htmlFor="save-info" className="text-black text-sm cursor-pointer">
              Save this information for faster check-out next time
            </label>
          </div>
        </form>

        {/* Order Summary & Payment */}
        <div className="lg:col-span-6 space-y-6 lg:pl-10 pt-4">
          {/* Cart Items List */}
          <div className="space-y-6">
            {cartItems.map((item) => {
              const imageUrl = item.product.image.startsWith('/') || item.product.image.startsWith('http')
                ? item.product.image
                : `/${item.product.image}`;

              return (
                <div key={item.product.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <img src={imageUrl} alt={item.product.title} className="w-12 h-12 object-contain" />
                    <span className="font-normal text-black max-w-[200px] truncate">{item.product.title}</span>
                  </div>
                  <span className="font-medium text-black">${item.product.price * item.quantity}</span>
                </div>
              );
            })}
          </div>

          {/* Pricing Totals */}
          <div className="space-y-3 divide-y divide-gray-200 text-sm pt-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3">
              <span>Shipping:</span>
              <span className="font-medium text-black">Free</span>
            </div>
            <div className="flex justify-between pt-3 font-medium text-base">
              <span>Total:</span>
              <span className="font-medium text-black">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-4 text-sm text-black cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  className="w-4 h-4 accent-black"
                />
                Bank
              </label>
              <div className="flex gap-2">
                <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded font-bold">Bkash</span>
                <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded font-bold">VISA</span>
                <span className="text-xs bg-gray-200 px-1.5 py-0.5 rounded font-bold">MasterCard</span>
              </div>
            </div>

            <label className="flex items-center gap-4 text-sm text-[#000000] cursor-pointer">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="w-4 h-4 accent-black"
              />
              Cash on delivery
            </label>
          </div>

          {/* Coupon Input */}
          <div className="flex gap-4 pt-2">
            <input
              type="text"
              placeholder="Coupon Code"
              className="border border-black rounded px-6 py-3 text-sm outline-none flex-1"
            />
            <button className="bg-[#DB4444] text-white px-8 py-3 rounded text-sm font-medium hover:bg-[#b93333] transition">
              Apply Coupon
            </button>
          </div>

          {/* Place Order Button */}
          <button className="bg-[#DB4444] text-white px-12 py-4 rounded text-sm font-medium hover:bg-[#b93333] transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};