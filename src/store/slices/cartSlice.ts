import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '../../types/product.types';

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<{ product: Product; quantity?: number }>
        ) => {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(
                (item) => item.product.id === product.id
            );

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                existingItem.quantity = Math.min(newQuantity, product.stock);
            } else {
                const initialQuantity = Math.min(quantity, product.stock);
                if (initialQuantity > 0) {
                    state.items.push({ product, quantity: initialQuantity });
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.product.id === id);
            if (item) {
                if (quantity <= 0) {
                    state.items = state.items.filter((i) => i.product.id !== id);
                } else {
                    item.quantity = Math.min(quantity, item.product.stock);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;