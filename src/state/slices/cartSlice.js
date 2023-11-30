import { createSlice } from "@reduxjs/toolkit";
import { hasOwnProperty } from "../../utils";

/*
type StateItem = {
    quantity: number
    title: string
    description: string
    price: number
    id: number
}

below we make an object of state items where the keys are mapped to the item id
this simplifies lookups or queries

type State = {
    [key: string]: StateItem
}
*/
const initialState = {};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart (state, action) {
            const { id, quantity } = action.payload;

            if (quantity <= 0) delete state[id];
            else state[id] = { ...action.payload }
        },
        addToCart (state, action) {
            const { id, quantity } = action.payload;

            if (!hasOwnProperty(state, id)) state[id] = { ...action.payload };
            else state[id].quantity += quantity;
        },
        removeFromCart (state, action) {
            const { id, quantity } = action.payload;

            if (hasOwnProperty(state, id)) {
                const difference = state[id].quantity - quantity;
                if (difference <= 0) delete state[id];
                else state[id].quantity = difference;
            }
        },
        clearCart () {
            return initialState;
        }
    }
});

export const { addToCart, removeFromCart, clearCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;