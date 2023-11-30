import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsListReducer from './slices/productsSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        productsList: productsListReducer
    }
});