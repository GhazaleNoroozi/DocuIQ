import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("api/message", (req, res) => {
    res.json({
        message: "Hello from the backend!"
    });
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})