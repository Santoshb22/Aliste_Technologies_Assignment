import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductDetailsById = createAsyncThunk("product/fetchById",
    async (id, thunkApi) => {
        try {
            const res = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue("Failed to load product")
        }
    }
)

const products = JSON.parse(localStorage.getItem("products")) || [];

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
        .addCase(fetchProductDetailsById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductDetailsById.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.productDetails = action.payload;

            localStorage.setItem('products', JSON.stringify(action.payload));
        })
        .addCase(fetchProductDetailsById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export default productDetailsSlice.reducer;