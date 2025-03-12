import express from "express";
import "dotenv/config";
import connectDB from "./db";
import router from "./routes/routes";

const PORT = process.env.SERVER_PORT || 8080;


try {
  connectDB().then(() => {
    const app = express();
    
    app.use("/api", router);
    
    app.listen(PORT, () => {
      console.log(`[server] Server running on port ${PORT}`);
    });
  });
}

catch (error) {
  console.log(error);
}
