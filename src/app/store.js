import { combineReducers, configureStore } from "@reduxjs/toolkit";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import cartReducer from "../features/cart/cartSlice";

import storage from "redux-persist/lib/storage";
import session from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage: session, // keep data in redux store per session
};

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
