import axios from "axios";
import type { Film } from "../../types/film";

const BASE_URL = "https://swapi.info/api/films";

export interface FetchFilmsResponse {
  count: number;
  results: Film[];
}

export const fetchFilms = async (): Promise<FetchFilmsResponse> => {
  try {
    const response = await axios.get(BASE_URL);

    if (Array.isArray(response.data)) {
      return {
        count: response.data.length,
        results: response.data.map((film: any, index: number) => ({
          ...film,
          id: film.id || `film-${index + 1}`,
          image: `/src/assets/images/films/${film.title
            .toLowerCase()
            .replace(/\s+/g, "-")}.jpeg`,
        })),
      };
    }

    if (response.data.results) {
      return {
        count: response.data.count || response.data.results.length,
        results: response.data.results.map((film: any, index: number) => ({
          ...film,
          id: film.id || `film-${index + 1}`,
          image: `/src/assets/images/films/${film.title
            .toLowerCase()
            .replace(/\s+/g, "-")}.jpeg`,
        })),
      };
    }

    return {
      count: 0,
      results: [],
    };
  } catch (error) {
    console.error("API: Error fetching films:", error);
    throw error;
  }
};
