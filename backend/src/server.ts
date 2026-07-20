import express from "express";
import cors from "cors";
import multer from "multer";


const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use(express.json());

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from the backend!"
    });
});

app.post("/api/documents", upload.single("file"), (req, res) => {
    console.log(req.file);

    res.json({
        message: "File uploaded"
    });
});

app.listen(5000, () => {
    console.log("server is running on port 5000");
})
