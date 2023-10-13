import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      state.wishlistItems = [...state.wishlistItems, action.payload];
    },
    removeFromWishlist: (state, action) => {
      const index = state.wishlistItems.findIndex(
        (item) => item._id === action.payload._id
      );

      let newWishlist = [...state.wishlistItems];

      if (index >= 0) {
        newWishlist.splice(index, 1);
      } else {
        console.warn(
          `Can't remove this shoe (id: ${action.payload._id}) as it's 
          not in your wishlist`
        );
      }

      state.wishlistItems = newWishlist;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlist = (state) => state.wishlist.wishlistItems;

export default wishlistSlice.reducer;
