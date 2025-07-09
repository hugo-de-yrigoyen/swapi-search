import { Request as HapiRequest, ResponseToolkit } from "@hapi/hapi";
import swapiService from "../services/swapiService";

export const search = async (request: HapiRequest, h: ResponseToolkit) => {
  try {
    const { q: query, type } = request.query as { q?: string; type?: string };

    // Allow empty query to fetch all results
    if (typeof query !== "string") {
      return h.response({ error: "Query parameter is required" }).code(400);
    }

    const results = await swapiService.searchAll(query);

    // Filter by type if specified
    if (type && typeof type === "string") {
      results.results = results.results.filter((result: any) => result.type === type);
      results.totalCount = results.results.length;
    }

    return h.response(results);
  } catch (error) {
    console.error("Search error:", error);
    return h.response({ error: "Failed to search the Imperial database" }).code(500);
  }
};

export const getDetails = async (request: HapiRequest, h: ResponseToolkit) => {
  try {
    const { type, id } = request.params as { type?: string; id?: string };

    if (!type || !id) {
      return h.response({ error: "Type and ID parameters are required" }).code(400);
    }

    const details = await swapiService.getDetails(type, id);
    return h.response(details);
  } catch (error) {
    console.error("Get details error:", error);
    return h.response({ error: "Failed to get details from the Imperial database" }).code(500);
  }
};
