import { Router } from "express";
import upload from "../middlewares/uploadMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
    uploadDocument,
    chatAboutDocument,
    getUserDocuments,
    getSingleDocument
} from "../controllers/documentController";

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

router.get(
    "/:id",
    authMiddleware,
    getSingleDocument
);

export default router;