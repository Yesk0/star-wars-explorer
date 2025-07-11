import axios from "axios";
import type { Starship } from "../../types/starship";

const BASE_URL = "https://swapi.info/api/starships";

export interface FetchStarshipsParams {
  page?: number;
  search?: string;
}

export interface FetchStarshipsResponse {
  count: number;
  results: Starship[];
}

export const fetchStarships = async (
  params: FetchStarshipsParams = {}
): Promise<FetchStarshipsResponse> => {
  const { page = 1, search = "" } = params;

  try {
    const response = await axios.get(BASE_URL, {
      params: { page, search },
    });

    if (Array.isArray(response.data)) {
      return {
        count: response.data.length,
        results: response.data.map((starship: any, index: number) => ({
          ...starship,
          id: starship.id || `starship-${index + 1}`,
          image: `/images/starships/${starship.name
            .toLowerCase()
            .replace(/\s+/g, "-")}.jpeg`,
        })),
      };
    }

    if (response.data.results) {
      return {
        count: response.data.count || response.data.results.length,
        results: response.data.results.map((starship: any, index: number) => ({
          ...starship,
          id: starship.id || `starship-${index + 1}`,
          image: `/images/starships/${starship.name
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
    console.error("API: Error fetching starships:", error);
    throw error;
  }
};
