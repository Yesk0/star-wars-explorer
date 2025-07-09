import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Character } from "../../types/character";
import { fetchCharacters } from "../../services/api/charactersApi";
import type {
  FetchCharactersParams,
  FetchCharactersResponse,
} from "../../services/api/charactersApi";

export type StatusType = "idle" | "loading" | "success" | "error";

interface CharactersState {
  items: Character[];
  filteredItems: Character[];
  count: number;
  status: StatusType;
  error: string | null;
  page: number;
  search: string;
}

const initialState: CharactersState = {
  items: [],
  filteredItems: [],
  count: 0,
  status: "idle",
  error: null,
  page: 1,
  search: "",
};

export const loadCharacters = createAsyncThunk<
  FetchCharactersResponse,
  FetchCharactersParams
>("characters/loadCharacters", async (params) => {
  const result = await fetchCharacters(params);
  return result;
});

const charactersSlice = createSlice({
  name: "characters",
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
        const filtered = state.items.filter((char) =>
          char.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.filteredItems = filtered;
        state.count = filtered.length;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCharacters.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCharacters.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.results;
        if (state.search.trim() === "") {
          state.filteredItems = action.payload.results;
          state.count = action.payload.count;
        } else {
          const filtered = action.payload.results.filter((char) =>
            char.name.toLowerCase().includes(state.search.toLowerCase())
          );
          state.filteredItems = filtered;
          state.count = filtered.length;
        }
      })
      .addCase(loadCharacters.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Error loading characters";
      });
  },
});

export const { setPage, setSearch } = charactersSlice.actions;
export default charactersSlice.reducer;
