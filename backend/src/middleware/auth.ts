import jwt from "jsonwebtoken";
import { Request as HapiRequest, ResponseToolkit, Lifecycle } from "@hapi/hapi";

const JWT_SECRET = process.env.JWT_SECRET || "rebel-alliance-secret-key";

export const authenticateToken = async (request: HapiRequest, h: ResponseToolkit): Promise<any> => {
  const authHeader = request.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return h.response({ error: "Access token required" }).code(401).takeover();
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as { username: string };
    // Attach user to request.auth.credentials for downstream handlers
    (request.auth as any).credentials = user;
    return h.continue;
  } catch (err) {
    return h.response({ error: "Invalid or expired token" }).code(403).takeover();
  }
};

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, { expiresIn: "24h" });
};
