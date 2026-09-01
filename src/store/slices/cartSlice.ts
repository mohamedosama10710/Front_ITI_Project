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
            const stock = product.stock ?? 999; // حماية من undefined stock

            const existingItem = state.items.find(
                (item) => String(item.product.id) === String(product.id)
            );

            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                existingItem.quantity = Math.min(newQuantity, stock);
            } else {
                const initialQuantity = Math.min(quantity, stock);
                if (initialQuantity > 0) {
                    state.items.push({ product, quantity: initialQuantity });
                }
            }
        },
        removeFromCart: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(
                (item) => String(item.product.id) !== String(action.payload)
            );
        },
        updateQuantity: (
            state,
            action: PayloadAction<{ id: string | number; quantity: number }>
        ) => {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => String(i.product.id) === String(id));
            if (item) {
                const stock = item.product.stock ?? 999;
                if (quantity <= 0) {
                    state.items = state.items.filter((i) => String(i.product.id) !== String(id));
                } else {
                    item.quantity = Math.min(quantity, stock);
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