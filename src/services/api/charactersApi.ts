import axios from "axios";
import type { Character } from "../../types/character";

const BASE_URL = "https://swapi.info/api/people";

export interface FetchCharactersParams {
  page?: number;
  search?: string;
}

export interface FetchCharactersResponse {
  count: number;
  results: Character[];
}

export const fetchCharacters = async (
  params: FetchCharactersParams = {}
): Promise<FetchCharactersResponse> => {
  const { page = 1, search = "" } = params;

  try {
    const response = await axios.get(BASE_URL, {
      params: { page, search },
    });

    if (Array.isArray(response.data)) {
      return {
        count: response.data.length,
        results: response.data.map((char: any, index: number) => ({
          ...char,
          id: char.id || `char-${index + 1}`,
          image: `/src/assets/images/characters/${char.name
            .toLowerCase()
            .replace(/\s+/g, "-")}.jpeg`,
        })),
      };
    }

    if (response.data.results) {
      return {
        count: response.data.count || response.data.results.length,
        results: response.data.results.map((char: any, index: number) => ({
          ...char,
          id: char.id || `char-${index + 1}`,
          image: `/src/assets/images/characters/${char.name
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
    console.error("API: Error fetching characters:", error);
    throw error;
  }
};
