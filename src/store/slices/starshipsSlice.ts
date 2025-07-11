import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Starship } from "../../types/starship";
import { fetchStarships } from "../../services/api/starshipsApi";
import type {
  FetchStarshipsParams,
  FetchStarshipsResponse,
} from "../../services/api/starshipsApi";
import type { StatusType } from "./charactersSlice";

interface StarshipsState {
  items: Starship[];
  filteredItems: Starship[];
  count: number;
  status: StatusType;
  error: string | null;
  page: number;
  search: string;
}

const initialState: StarshipsState = {
  items: [],
  filteredItems: [],
  count: 0,
  status: "idle",
  error: null,
  page: 1,
  search: "",
};

export const loadStarships = createAsyncThunk<
  FetchStarshipsResponse,
  FetchStarshipsParams
>("starships/loadStarships", async (params) => {
  return await fetchStarships(params);
});

const starshipsSlice = createSlice({
  name: "starships",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
      if (action.payload.trim() === "") {
        state.filteredItems = state.items;
        state.count = state.items.length;
      } else {
        const filtered = state.items.filter((starship) =>
          starship.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.filteredItems = filtered;
        state.count = filtered.length;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadStarships.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadStarships.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.results;
        if (state.search.trim() === "") {
          state.filteredItems = action.payload.results;
          state.count = action.payload.count;
        } else {
          const filtered = action.payload.results.filter((starship) =>
            starship.name.toLowerCase().includes(state.search.toLowerCase())
          );
          state.filteredItems = filtered;
          state.count = filtered.length;
        }
      })
      .addCase(loadStarships.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Error loading starships";
      });
  },
});

export const { setPage, setSearch } = starshipsSlice.actions;
export default starshipsSlice.reducer;
