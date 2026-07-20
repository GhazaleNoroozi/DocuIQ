import { Request, Response } from "express";
import { extractTextFromPDF } from "../services/pdfService";
import { summarize } from "../services/llmService";

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