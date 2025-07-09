import { combineReducers } from "@reduxjs/toolkit";
import charactersReducer from "./slices/charactersSlice";
import planetsReducer from "./slices/planetsSlice";
import starshipsReducer from "./slices/starshipsSlice";
import filmsReducer from "./slices/filmsSlice";
import favoritesReducer from "./slices/favoritesSlice";

const rootReducer = combineReducers({
  characters: charactersReducer,
  planets: planetsReducer,
  starships: starshipsReducer,
  films: filmsReducer,
  favorites: favoritesReducer,
  // Добавляй другие редьюсеры по мере необходимости
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
