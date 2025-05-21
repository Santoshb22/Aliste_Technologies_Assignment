import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllProducts = createAsyncThunk("product/fetchAll",
    async (_, thunkApi) => {
        try {
            const res = await fetch("https://fakestoreapi.com/products");
            const data = await res.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue("Error loading products");
        }
    }
)
const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
const initialState = {
    productsData: allProducts,
    loading: false,
    error: null,
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.productsData = action.payload;
        localStorage.setItem("allProducts", JSON.stringify(action.payload))
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    }
})

export default productSlice.reducer;