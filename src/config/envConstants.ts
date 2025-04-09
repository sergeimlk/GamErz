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
export const SALT_ROUNDS = getEnv("SALT_ROUNDS");
