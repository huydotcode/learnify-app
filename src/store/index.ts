// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/store/cartSlice";
import favoriteReducer from "../features/favorites/store/favoriteSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
