import express from "express";
import cors from "cors";
import multer from "multer";
import pdf from "pdf-parse";
import fs from "fs/promises";


const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from the backend!"
    });
});

app.post("/api/documents", upload.single("file"), async (req, res) => {
    console.log(req.file);
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }
    const fileBuffer = await fs.readFile(req.file.path);
    const data = await pdf(fileBuffer);

    res.json({
        message: data.text
    });
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})
