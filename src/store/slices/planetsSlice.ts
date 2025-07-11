import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Planet } from "../../types/planet";
import { fetchPlanets } from "../../services/api/planetsApi";
import type {
  FetchPlanetsParams,
  FetchPlanetsResponse,
} from "../../services/api/planetsApi";
import type { StatusType } from "./charactersSlice";

interface PlanetsState {
  items: Planet[];
  filteredItems: Planet[];
  count: number;
  status: StatusType;
  error: string | null;
  page: number;
  search: string;
}

const initialState: PlanetsState = {
  items: [],
  filteredItems: [],
  count: 0,
  status: "idle",
  error: null,
  page: 1,
  search: "",
};

export const loadPlanets = createAsyncThunk<
  FetchPlanetsResponse,
  FetchPlanetsParams
>("planets/loadPlanets", async (params) => {
  return await fetchPlanets(params);
});

const planetsSlice = createSlice({
  name: "planets",
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
        const filtered = state.items.filter((planet) =>
          planet.name.toLowerCase().includes(action.payload.toLowerCase())
        );
        state.filteredItems = filtered;
        state.count = filtered.length;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlanets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadPlanets.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload.results;
        if (state.search.trim() === "") {
          state.filteredItems = action.payload.results;
          state.count = action.payload.count;
        } else {
          const filtered = action.payload.results.filter((planet) =>
            planet.name.toLowerCase().includes(state.search.toLowerCase())
          );
          state.filteredItems = filtered;
          state.count = filtered.length;
        }
      })
      .addCase(loadPlanets.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message || "Error loading planets";
      });
  },
});

export const { setPage, setSearch } = planetsSlice.actions;
export default planetsSlice.reducer;
