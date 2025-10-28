import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js"
import pageRoutes from "./routes/pageRoutes.js"

dotenv.config();

const app = express();
app.use(express.static("../frontend"));
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todoDB";
mongoose
    .connect(MONGO_URI)
    .then(()=> console.log("connected to mongoDB"))
    .catch((err) => console.log("error connecting to mongoDB:", err))

app.use("/api/todos", todoRoutes);

app.use("/", pageRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`))