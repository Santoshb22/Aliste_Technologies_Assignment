import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./productsSlice";
import productDetailsReducer from "./productDetailsSlice";
import createReducer from "./cartSlice"; // renamed from createReducer to cartReducer

export const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
        cart: createReducer,
    },
});

export default store;