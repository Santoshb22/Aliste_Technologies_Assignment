import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addOrRemoveItem(state, action) {
            const id = action.payload;
            const isInCart = state.items.find(item => item?.id === id);
            if(!isInCart) {
                state.items.push({id, qty: 1});
            } else {
                state.items = state.items.filter(item => item?.id !== id);
            }
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        
        deleteFromCart(state, action) {
        const id = action.payload;
        state.items = state.items.filter(item => item.id !== id);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        increaseQty(state, action) {
        const id = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) item.qty += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        decreaseQty(state, action) {
        const id = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
            if (item.qty > 1) {
            item.qty -= 1;
            } else {
            state.items = state.items.filter(i => i.id !== id);
            }
        }
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
    }
})

export const {addOrRemoveItem, deleteFromCart, increaseQty, decreaseQty} = cartSlice.actions;
export default cartSlice.reducer;