import express from 'express';
import "dotenv/config"
import connectDB from "./db"

const app = express();
const PORT = process.env.SERVER_PORT || 8080

try {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`[server] Server running on port ${PORT}`);
      });
  });
} catch (error) {
  console.log(error);
}