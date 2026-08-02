import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddleware";
import { extractTextFromPDF } from "../services/pdfService";
import { getDocument, saveDocument } from "../services/documentService";
import { summarize } from "../services/llmService";
import { answerQuestion } from "../services/llmService";
import fs from "fs/promises";

export async function uploadDocument(
    req: AuthRequest,
    res: Response
) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const content = await extractTextFromPDF(req.file.path)
        const summary = await summarize(content);
        const documentId = await saveDocument(
            req.user!.userId,
            req.file.originalname,
            content,
            summary
        );

        await fs.unlink(req.file.path);

        return res.json({
            message: "Document processed successfully",
            documentId,
            content,
            summary
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to process document"
        });
    }
}

export async function chatAboutDocument(
    req: AuthRequest,
    res: Response
){
    try {     
        const { question, documentId } = req.body;
        const document = await getDocument(
            documentId,
            req.user!.userId
        );
        const answer = await answerQuestion(document.content, question);

        return res.json({
            message: "AI assistant responded successfully",
            answer: answer
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to connect with the AI Assistant"
        });
    }
}