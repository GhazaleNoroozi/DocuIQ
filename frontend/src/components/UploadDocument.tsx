import { useState, useRef } from "react";
import { apiFetch } from "../services/api";

type UploadDocumentProps = {
    setSummary: (summary: string) => void;
    setDocumentId: (documentId: number) => void;
};


function UploadDocument({ setSummary, setDocumentId }: UploadDocumentProps) {
    const [file, setFile] = useState<File | null>(null);
    const uploadButtonRef = useRef<HTMLButtonElement>(null);
    const API_URL = import.meta.env.VITE_API_URL;


    const handleUpload = async () => {
        if (!file) {
            alert("Please select a PDF");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await apiFetch(
            `${API_URL}/api/documents/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response) return;

        const data = await response.json();
        setSummary(data.summary);
        setDocumentId(data.documentId);
        console.log(data);
    };

    return (
        <div>
            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                    if (e.target.files) {
                        setFile(e.target.files[0]);
                        uploadButtonRef.current?.focus();
                    }
                }}
            />

            <button onClick={handleUpload} ref={uploadButtonRef}>
                Upload PDF
            </button>
        </div>
    );
}

export default UploadDocument;