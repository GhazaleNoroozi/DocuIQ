import { Request, Response } from "express";
import { extractTextFromPDF } from "../services/pdfService";
import { getCurrentDocument, setCurrentDocument } from "../services/documentService";
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
        setCurrentDocument(text);
        const summary = await summarize(text);

        return res.json({
            message: "Document processed successfully",
            text: text,
            summary: summary
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
        const question = req.body.question;
        const document = getCurrentDocument();   
        const answer = await answerQuestion(document, question);

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