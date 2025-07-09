import axios from "axios";
import https from "https";
import { SWAPIResponse, SearchResult, SearchResponse } from "../types";

const SWAPI_BASE_URL = "https://swapi.py4e.com/api";

// Configure axios to ignore SSL certificate errors
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const CATEGORIES = ["people", "starships", "planets", "films", "species", "vehicles"] as const;

class SWAPIService {
  private async searchCategory(category: string, query: string): Promise<SearchResult[]> {
    try {
      const response = await axiosInstance.get(`${SWAPI_BASE_URL}/${category}/?search=${encodeURIComponent(query)}`);
      const data: SWAPIResponse<any> = response.data;

      // Only include items where name or title contains the query (case-insensitive)
      const filtered = data.results.filter((item: any) => {
        const value = (item.name || item.title || "").toLowerCase();
        return value.includes(query.toLowerCase());
      });
      return filtered.map((item: any) => ({
        id: this.extractIdFromUrl(item.url),
        name: item.name || item.title,
        type: category as any,
        data: item,
        url: item.url,
      }));
    } catch (error) {
      console.error(`Error searching ${category}:`, error);
      return [];
    }
  }

  private async fetchAllFromCategory(category: string): Promise<SearchResult[]> {
    let results: SearchResult[] = [];
    let nextUrl: string | null = `${SWAPI_BASE_URL}/${category}/`;
    while (nextUrl) {
      try {
        const response = await axiosInstance.get(nextUrl);
        const data: SWAPIResponse<any> = response.data;
        results = results.concat(
          data.results.map((item: any) => ({
            id: this.extractIdFromUrl(item.url),
            name: item.name || item.title,
            type: category as any,
            data: item,
            url: item.url,
          }))
        );
        nextUrl = data.next;
      } catch (error) {
        console.error(`Error fetching all from ${category}:`, error);
        break;
      }
    }
    return results;
  }

  private extractIdFromUrl(url: string): string {
    const parts = url.split("/");
    return parts[parts.length - 2];
  }

  async searchAll(query: string): Promise<SearchResponse> {
    // Always fetch all items and filter by name/title in Node.js
    try {
      const allPromises = CATEGORIES.map((category) => this.fetchAllFromCategory(category));
      const results = await Promise.all(allPromises);
      const flatResults = results.flat();
      let filteredResults = flatResults;
      if (query.trim()) {
        const q = query.toLowerCase();
        filteredResults = flatResults.filter((item) => {
          if (item.type === "films") {
            // @ts-ignore
            const value = (item.data.title || "").toLowerCase();
            return value.includes(q);
          } else {
            // @ts-ignore
            const value = (item.data.name || "").toLowerCase();
            return value.includes(q);
          }
        });
      }
      return {
        results: filteredResults,
        totalCount: filteredResults.length,
        query,
      };
    } catch (error) {
      console.error("Error in fetchAllFromCategory:", error);
      return {
        results: [],
        totalCount: 0,
        query,
      };
    }
  }

  async getDetails(type: string, id: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`${SWAPI_BASE_URL}/${type}/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error getting ${type} details:`, error);
      throw new Error(`Failed to get ${type} details`);
    }
  }
}

export default new SWAPIService();
