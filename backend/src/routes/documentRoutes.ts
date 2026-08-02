import { Router } from "express";
import upload from "../middlewares/uploadMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploadDocument, chatAboutDocument, getUserDocuments } from "../controllers/documentController";

const router = Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("file"),
    uploadDocument
);

router.post(
    "/chat",
    authMiddleware,
    chatAboutDocument
);

router.get(
    "/",
    authMiddleware,
    getUserDocuments
);

export default router;