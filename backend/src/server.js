import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connectDB();

// this middlware will help to parse json data from request body
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());
app.use(rateLimiter);

// simple middleware to log request method  and url
// app.use((req,res,next) => {
//     console.log(`request method: ${req.method}, request url: ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
