import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type FavoriteType = "character" | "planet" | "starship" | "film";

export interface FavoriteItem {
  type: FavoriteType;
  id: string;
  data: any; 
}

interface FavoritesState {
  items: FavoriteItem[];
}

const loadFromStorage = (): FavoriteItem[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToStorage = (items: FavoriteItem[]) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(items));
  } catch {}
};

const initialState: FavoritesState = {
  items: loadFromStorage(),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FavoriteItem>) {
      const exists = state.items.some(
        (item) =>
          item.type === action.payload.type && item.id === action.payload.id
      );
      if (!exists) {
        state.items.push(action.payload);
        saveToStorage(state.items);
      }
    },
    removeFavorite(
      state,
      action: PayloadAction<{ type: FavoriteType; id: string }>
    ) {
      state.items = state.items.filter(
        (item) =>
          !(item.type === action.payload.type && item.id === action.payload.id)
      );
      saveToStorage(state.items);
    },
    clearFavorites(state) {
      state.items = [];
      saveToStorage(state.items);
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
