import { Router } from "express";
import upload from "../middlewares/uploadMiddleware";
import { uploadDocument } from "../controllers/documentController";

const router = Router();

router.post(
    "/upload",
    upload.single("file"),
    uploadDocument
);

export default router;