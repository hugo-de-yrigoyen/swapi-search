import { search, getDetails } from "../controllers/searchController";
import { authenticateToken } from "../middleware/auth";

const searchRoutes = [
  {
    method: "GET",
    path: "/search",
    options: {
      pre: [{ method: authenticateToken }],
    },
    handler: search,
  },
  {
    method: "GET",
    path: "/details/{type}/{id}",
    options: {
      pre: [{ method: authenticateToken }],
    },
    handler: getDetails,
  },
];

export default searchRoutes;
