import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    paginationCount: 0,
    products: []
}

const productsListSlice = createSlice({
    name: 'productsList',
    initialState,
    reducers: {
        addedToList (state, action) {
            state.paginationCount = action.payload.paginationCount;
            state.products.push(...action.payload.products);
        }
    }
});

export const { addedToList } = productsListSlice.actions;
export default productsListSlice.reducer;