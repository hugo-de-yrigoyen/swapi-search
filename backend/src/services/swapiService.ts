import axios from 'axios';
import https from 'https';
import { SWAPIResponse, SearchResult, SearchResponse } from '../types';

const SWAPI_BASE_URL = 'https://swapi.dev/api';

// Configure axios to ignore SSL certificate errors
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

const CATEGORIES = [
  'people',
  'starships',
  'planets',
  'films',
  'species',
  'vehicles'
] as const;

class SWAPIService {
  private async searchCategory(category: string, query: string): Promise<SearchResult[]> {
    try {
      const response = await axiosInstance.get(`${SWAPI_BASE_URL}/${category}/?search=${encodeURIComponent(query)}`);
      const data: SWAPIResponse<any> = response.data;
      
      return data.results.map((item: any) => ({
        id: this.extractIdFromUrl(item.url),
        name: item.name || item.title,
        type: category as any,
        data: item,
        url: item.url
      }));
    } catch (error) {
      console.error(`Error searching ${category}:`, error);
      return [];
    }
  }

  private extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }

  async searchAll(query: string): Promise<SearchResponse> {
    if (!query.trim()) {
      return {
        results: [],
        totalCount: 0,
        query
      };
    }

    try {
      const searchPromises = CATEGORIES.map(category => 
        this.searchCategory(category, query)
      );

      const results = await Promise.all(searchPromises);
      const flatResults = results.flat();

      return {
        results: flatResults,
        totalCount: flatResults.length,
        query
      };
    } catch (error) {
      console.error('Error in searchAll:', error);
      throw new Error('Failed to search SWAPI');
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