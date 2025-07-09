import { generateToken } from "../middleware/auth";
import { AuthUser } from "../types";
import { Request as HapiRequest, ResponseToolkit } from "@hapi/hapi";

// Fixed credentials for the Alliance
const REBEL_USER: AuthUser = {
  username: "Luke",
  password: "DadSucks",
};

export const login = async (request: HapiRequest, h: ResponseToolkit) => {
  try {
    const { username, password } = request.payload as { username: string; password: string };

    if (!username || !password) {
      return h.response({ error: "Username and password are required" }).code(400);
    }

    // Check credentials
    if (username !== REBEL_USER.username || password !== REBEL_USER.password) {
      return h.response({ error: "Invalid credentials" }).code(401);
    }

    // Generate token
    const token = generateToken(username);

    return h.response({
      message: "Welcome to the Rebel Alliance, young Padawan!",
      token,
      user: { username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return h.response({ error: "Internal server error" }).code(500);
  }
};

export const verify = (request: HapiRequest, h: ResponseToolkit) => {
  // The user should be attached to request.auth.credentials by the auth strategy
  return h.response({ message: "Token is valid", user: (request.auth && request.auth.credentials) || null });
};
