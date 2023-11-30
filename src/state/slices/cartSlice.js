import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

/*
type StateItem = {
    quantity: number
    title: string
    description: string
    price: number
    id: number
}

below we make an object of state items where the keys are mapped to the item id

type State = {
    [key: string]: StateItem
}
*/

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updatedCart (state, action) {
            const { id, quantity } = action.payload;

            if (quantity <= 0) delete state[id];
            else state[id] = { ...action.payload }
        },
        addedToCart (state, action) {
            const { id, quantity } = action.payload;

            if (!state.hasOwnProperty(id)) state[id] = { ...action.payload };
            else state[id].quantity += quantity;
        },
        removedFromCart (state, action) {
            const { id, quantity } = action.payload;

            if (state.hasOwnProperty(id)) {
                const difference = state[id].quantity - quantity;
                if (difference <= 0) delete state[id];
                else state[id].quantity = difference;
            }
        },
        clearedCart () {
            return initialState;
        }
    }
});

export const { addedToCart, removedFromCart, clearedCart, updatedCart } = cartSlice.actions;
export default cartSlice.reducer;