import { useState } from "react";

type UploadDocumentProps = {
    setSummary: (summary: string) => void;
};

function UploadDocument({ setSummary }: UploadDocumentProps) {
    const [file, setFile] = useState<File | null>(null);

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a PDF");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(
            "http://localhost:5000/api/documents/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        setSummary(data.summary);
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
                    }
                }}
            />

            <button onClick={handleUpload}>
                Upload PDF
            </button>
        </div>
    );
}

export default UploadDocument;