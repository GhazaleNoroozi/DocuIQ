import express from "express";
import cors from "cors";
import documentRoutes from "./routes/documentRoutes";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from the backend!"
    });
});

app.use("/api/documents", documentRoutes);

app.listen(5000, () => {
    console.log("server is running on port 5000");
})

