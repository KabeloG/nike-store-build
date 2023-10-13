import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // reducer functions to define how the state can be updated
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (p) => (p.shoe._id = action.payload.id)
      );

      if (item) {
        item.quantity++;
        item.shoe.price = item.oneQuantityPrice * item.quantity;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.shoe._id === action.payload.id
      );

      let newCart = [...state.cartItems];

      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove this shoe (id: ${action.payload.id}) as it's 
          not in cart`
        );
      }

      state.cartItems = newCart;
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((item, index) => {
        if (item.shoe._id === action.payload.id) {
          if (action.payload.key === "quantity") {
            item.shoe.price = item.oneQuantityPrice * action.payload.val;
          }
          return { ...item, [action.payload.key]: action.payload.val };
        }
        return item;
      });
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const { addToCart, removeFromCart, updateCart, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;
