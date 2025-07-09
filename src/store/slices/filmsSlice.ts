import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Film } from "../../types/film";
import { fetchFilms } from "../../services/api/filmApi";
import type { FetchFilmsResponse } from "../../services/api/filmApi";
import type { StatusType } from "./charactersSlice";

interface FilmsState {
  items: Film[];
  filteredItems: Film[];
  count: number;
  status: StatusType;
  error: string | null;
  page: number;
  search: string;
}

const initialState: FilmsState = {
  items: [],
  filteredItems: [],
  count: 0,
  status: "idle",
  error: null,
  page: 1,
  search: "",
};

export const loadFilms = createAsyncThunk<FetchFilmsResponse>(
  "films/loadFilms",
  async () => {
    return await fetchFilms();
  }
);

const filmsSlice = createSlice({
  name: "films",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
      state.page = 1;
      // Client-side filtering
      if (action.payload.trim() === "") {
        state.filteredItems = state.items;
        state.count = state.items.length;
      } else {
        const filtered = state.items.filter((film) =>
          film.title.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.filteredItems = filtered;
        state.count = filtered.length;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFilms.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadFilms.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.results;
        // Apply search to new data
        if (state.search.trim() === "") {
          state.filteredItems = action.payload.results;
          state.count = action.payload.count;
        } else {
          const filtered = action.payload.results.filter((film) =>
            film.title.toLowerCase().includes(state.search.toLowerCase())
          );
          state.filteredItems = filtered;
          state.count = filtered.length;
        }
      })
      .addCase(loadFilms.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Error loading films";
      });
  },
});

export const { setPage, setSearch } = filmsSlice.actions;
export default filmsSlice.reducer;
