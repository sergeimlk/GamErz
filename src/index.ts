import express from "express";
import "dotenv/config";
import connectDB from "./db";
import router from "./routes/routes";

const app = express();
const PORT = process.env.SERVER_PORT || 8080;
app.use(router);

try {
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`[server] Server running on port ${PORT}`);
    });
  });
} catch (error) {
  console.log(error);
}
