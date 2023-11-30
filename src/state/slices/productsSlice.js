import { createSlice } from "@reduxjs/toolkit";

// { same object properties from the fakestore response }
const initialState = [];

// cache product list so user does not have to scroll through
// content again to view results they have already seen
// this currently does come with a performance tradeoff
// during the render cycle as there are more dom elements
const productsListSlice = createSlice({
    name: 'productsList',
    initialState,
    reducers: {
        addToList (state, action) {
            state.push(...action.payload);
        }
    }
});

export const { addToList } = productsListSlice.actions;
export default productsListSlice.reducer;