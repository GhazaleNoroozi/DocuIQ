import fs from "fs/promises";
import { PDFParse } from "pdf-parse";
let currentDocument = "";

export function setCurrentDocument(text: string) {
    currentDocument = text;
}

export function getCurrentDocument() {
    return currentDocument;
}

export async function extractTextFromPDF(filePath: string) {
    const fileBuffer = await fs.readFile(filePath);

    const parser = new PDFParse({
        data: fileBuffer
    });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
}

