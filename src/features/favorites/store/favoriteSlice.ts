import type { FavoriteItemType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface FavoriteState {
  items: FavoriteItemType[];
}

const initialState: FavoriteState = {
  items: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<FavoriteItemType>) {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.userId === item.userId
      );
      if (!existing) {
        state.items.push(item);
      }
    },
    removeFromFavorites(
      state,
      action: PayloadAction<{ productId: string; userId: string }>
    ) {
      const { productId, userId } = action.payload;
      state.items = state.items.filter(
        (i) => i.productId !== productId || i.userId !== userId
      );
    },
    clearFavorites(state) {
      state.items = [];
    },
    toggleFavorite(state, action: PayloadAction<FavoriteItemType>) {
      const item = action.payload;
      const existing = state.items.find(
        (i) => i.productId === item.productId && i.userId === item.userId
      );
      if (existing) {
        state.items = state.items.filter(
          (i) => i.productId !== item.productId || i.userId !== item.userId
        );
      } else {
        state.items.push(item);
      }
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  toggleFavorite,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
