import axios from "axios";
import type { Planet } from "../../types/planet";

const BASE_URL = "https://swapi.info/api/planets";

export interface FetchPlanetsParams {
  page?: number;
  search?: string;
}

export interface FetchPlanetsResponse {
  count: number;
  results: Planet[];
}

export const fetchPlanets = async (
  params: FetchPlanetsParams = {}
): Promise<FetchPlanetsResponse> => {
  const { page = 1, search = "" } = params;

  try {
    const response = await axios.get(BASE_URL, {
      params: { page, search },
    });

    if (Array.isArray(response.data)) {
      return {
        count: response.data.length,
        results: response.data.map((planet: any, index: number) => ({
          ...planet,
          id: planet.id || `planet-${index + 1}`,
          image: `/src/assets/images/planets/${planet.name
            .toLowerCase()
            .replace(/\s+/g, "-")}.jpeg`,
        })),
      };
    }

    if (response.data.results) {
      return {
        count: response.data.count || response.data.results.length,
        results: response.data.results.map((planet: any, index: number) => ({
          ...planet,
          id: planet.id || `planet-${index + 1}`,
          image: `/src/assets/images/planets/${planet.name
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
    console.error("API: Error fetching planets:", error);
    throw error;
  }
};
