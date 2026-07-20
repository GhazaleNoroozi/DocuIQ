declare module "pdf-parse" {
    interface PDFData {
        text: string;
        numpages: number;
        info: object;
    }

    function pdfParse(buffer: Buffer): Promise<PDFData>;

    export default pdfParse;
}