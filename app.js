import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./db.js";
import dogRoutes from "./routes/dogRoutes.js";


dotenv.config();
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/dogs", dogRoutes);

//Health Check
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// Connect to DB and start
const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
