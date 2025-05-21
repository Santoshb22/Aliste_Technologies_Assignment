import { configureStore } from '@reduxjs/toolkit'
import productReducer from "./productsSlice";
import productDetailsReducer from "./productDetailsSlice";

export const store = configureStore({
    reducer: {
        products: productReducer,
        productDetails: productDetailsReducer,
    },
});

export default store;