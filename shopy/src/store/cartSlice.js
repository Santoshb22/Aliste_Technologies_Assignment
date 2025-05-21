import { createSlice } from "@reduxjs/toolkit";

// Initial state: Load cart items from localStorage or set to an empty array
const initialState = { 
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
}

// Creating the cart slice
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
         /**
         * Adds an item to the cart if it's not present.
         * If it's already in the cart, removes it (toggle behavior).
         */
        addOrRemoveItem(state, action) {
            const id = action.payload;
            const isInCart = state.items.find(item => item?.id === id);
            if(!isInCart) {
                // Add new item with qty 1
                state.items.push({id, qty: 1});
            } else {
                // Remove item from cart
                state.items = state.items.filter(item => item?.id !== id);
            }

            // Sync with localStorage
            localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

        
        /**
         * Removes an item from the cart by ID
         */
        deleteFromCart(state, action) {
        const id = action.payload;
        state.items = state.items.filter(item => item.id !== id);
        // Sync with localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

         /**
         * Increases the quantity of a cart item by 1
         */
        increaseQty(state, action) {
        const id = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) item.qty += 1;
        // Sync with localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        },

    
        /**
         * Decreases the quantity of a cart item by 1
         * If qty becomes 0, removes the item from the cart
         */
        decreaseQty(state, action) {
        const id = action.payload;
        const item = state.items.find(item => item.id === id);
        if (item) {
            if (item.qty > 1) {
            item.qty -= 1;
            } else {
            // Remove item if qty is 1
            state.items = state.items.filter(i => i.id !== id);
            }
        }
        // Sync with localStorage
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        }
    }
})

// Exporting the actions for dispatch
export const {addOrRemoveItem, deleteFromCart, increaseQty, decreaseQty} = cartSlice.actions;

// Exporting the reducer for use in store configuration
export default cartSlice.reducer;