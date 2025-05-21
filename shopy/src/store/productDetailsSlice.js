import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk to fetch product details by ID from fakestoreapi
export const fetchProductDetailsById = createAsyncThunk("product/fetchById",
    async (id, thunkApi) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
            // Pass error message to rejected action payload
            return thunkApi.rejectWithValue("Failed to load product")
        }
    }
)
// Retrieve stored product details from localStorage (fallback to empty object)
const products = JSON.parse(localStorage.getItem("products")) || [];

// Initial state for product details slice
const initialState = {
    productDetails: products,
    loading: false,
    error: null,
};

export const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Pending state: set loading true, clear previous error
        .addCase(fetchProductDetailsById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        // Fulfilled state: store fetched product details and save to localStorage
        .addCase(fetchProductDetailsById.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.productDetails = action.payload;

            localStorage.setItem('products', JSON.stringify(action.payload));
        })
        // Rejected state: loading false, set error message
        .addCase(fetchProductDetailsById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default productDetailsSlice.reducer;