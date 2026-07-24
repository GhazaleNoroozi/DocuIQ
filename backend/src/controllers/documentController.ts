import { Request, Response } from "express";
import { extractTextFromPDF } from "../services/pdfService";
import { getDocument, saveDocument } from "../services/documentService";
import { summarize } from "../services/llmService";
import { answerQuestion } from "../services/llmService";

export async function uploadDocument(
    req: Request,
    res: Response
) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const text = await extractTextFromPDF(req.file.path);
        const documentId = await saveDocument(
            req.file.originalname,
            text
        );
        const summary = await summarize(text);

        return res.json({
            message: "Document processed successfully",
            documentId,
            text,
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
    req: Request,
    res: Response
){
    try {     
        const { question, documentId } = req.body;
        const document = await getDocument(documentId);  
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