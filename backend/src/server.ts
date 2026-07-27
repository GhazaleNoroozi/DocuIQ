import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes";
import authRoutes from "./routes/authRoutes";
import "dotenv/config";
import { pool } from "./db";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from the backend!"
    });
});

app.use("/api/documents", documentRoutes);
app.use("/api/auth", authRoutes);

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Database connected:", result.rows);
    }
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})

