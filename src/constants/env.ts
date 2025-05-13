import "dotenv/config";

const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(
      "environment variable is missing. Please check your .env file for the variable: " +
        key
    );
  }

  return value;
};

export const NODE_ENV = getEnv("NODE_ENV");

// server
export const SERVER_PORT = parseInt(getEnv("SERVER_PORT", "8080"));

// database
export const DB_NAME = getEnv("DB_NAME");
export const DB_USER = getEnv("DB_USER");
export const DB_PASSWORD = getEnv("DB_PASSWORD");
export const DB_PORT = getEnv("DB_PORT");
export const DB_URI = `mongodb://localhost:${DB_PORT}/${DB_NAME}`;
// export const DB_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}?authSource=admin`;

// front
export const FRONT_URL = getEnv("FRONT_URL");

// user auth
export const SALT_ROUNDS = parseInt(getEnv("SALT_ROUNDS"));

// jwt
export const JWT_ACCESS_SECRET = getEnv("JWT_ACCESS_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const JWT_MAX_AGE = 60 * 60 * 1000; // 1 hour in milliseconds
export const JWT_EXPIRATION_TIME = "1h";
export const JWT_REFRESH_MAX_AGE = 30 * 24 * JWT_MAX_AGE; // 30 days in milliseconds
export const JWT_REFRESH_TIME = "30d";