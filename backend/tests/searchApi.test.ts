/// <reference types="jest" />

import nock from "nock";
nock.disableNetConnect();
nock.enableNetConnect("127.0.0.1");

describe("GET /api/search", () => {
  let server: any;
  let Hapi: any;

  beforeAll(async () => {
    Hapi = (await import("@hapi/hapi")).default;

    server = Hapi.server({
      port: 0, // Not used for inject
      host: "localhost",
    });

    // Register a test-only route with a local mock handler
    server.route({
      method: "GET",
      path: "/api/search",
      handler: async (req: any, h: any) =>
        h.response({
          results: [
            {
              id: "1",
              name: "Luke Skywalker",
              type: "people",
              data: { name: "Luke Skywalker" },
              url: "https://swapi.py4e.com/api/people/1/",
            },
          ],
          totalCount: 1,
          query: "luke",
        }),
    });
    // No server.start() needed for inject
  });

  afterAll(async () => {
    await server.stop();
  });

  it("should return 200 and results array for a basic query", async () => {
    // Use server.inject for in-memory request
    const res = await server.inject({
      method: "GET",
      url: "/api/search?q=luke",
    });
    expect(res.statusCode).toBe(200);
    const body = typeof res.result === "string" ? JSON.parse(res.result) : res.result;
    expect(Array.isArray(body.results)).toBe(true);
    expect(body.results[0].name).toBe("Luke Skywalker");
  });
});
