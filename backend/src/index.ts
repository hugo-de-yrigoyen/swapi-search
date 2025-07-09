import Hapi from "@hapi/hapi";
import Boom from "@hapi/boom";
import authRoutes from "./routes/auth";
import searchRoutes from "./routes/search";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;

const init = async () => {
  const server = Hapi.server({
    port: PORT,
    host: "localhost",
    routes: {
      cors: true, // Enable CORS for all routes
    },
  });

  // Health check route
  server.route({
    method: "GET",
    path: "/health",
    handler: (request, h) => {
      return { status: "The Death Star plans are secure", timestamp: new Date().toISOString() };
    },
  });

  // Auth routes (prefix: /api/auth)
  // You will need to refactor your authRoutes to export Hapi-compatible route configs
  if (Array.isArray(authRoutes)) {
    server.route(authRoutes.map((route) => ({ ...route, path: `/api/auth${route.path}` })));
  }

  // Search routes (prefix: /api)
  if (Array.isArray(searchRoutes)) {
    server.route(searchRoutes.map((route) => ({ ...route, path: `/api${route.path}` })));
  }

  // 404 handler
  server.ext("onPreResponse", (request, h) => {
    const response = request.response;
    if (Boom.isBoom(response) && response.output.statusCode === 404) {
      return h.response({ error: "These are not the droids you are looking for..." }).code(404);
    }
    return h.continue;
  });

  await server.start();
  console.log(`🚀 Rebel Alliance API running on port ${PORT}`);
  console.log("📡 May the Force be with you!");
};

init();
