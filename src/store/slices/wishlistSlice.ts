import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../../types/product.types';

interface WishlistState {
  items: Product[];
}

const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<Product>) => {
      const exists = state.items.some(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter(
        (item) => String(item.id) !== String(action.payload)
      );
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex(
        (item) => String(item.id) === String(action.payload.id)
      );
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;