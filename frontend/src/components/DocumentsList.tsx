import { useEffect, useState } from "react";
import { getDocuments, deleteDocument } from "../services/documentService";


type Document = {
    id: number;
    filename: string;
    created_at: string;
};


type DocumentsListProps = {
    setDocumentId: (id: number) => void;
    selectedDocumentId: number | null;
    onDocumentDeleted: (id: number) => void;
};

function DocumentsList({
    setDocumentId,
    selectedDocumentId,
    onDocumentDeleted
}: DocumentsListProps) {

    const [documents, setDocuments] = useState<Document[]>([]);


    useEffect(() => {

        async function loadDocuments() {

            const docs = await getDocuments();

            if (docs) {
                setDocuments(docs);
            }
        }

        loadDocuments();

    }, []);

    async function handleDelete(id: number) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) {
            return;
        }

        const success = await deleteDocument(id);

        if (success) {
            setDocuments(prev =>
                prev.filter(doc => doc.id !== id)
            );

            onDocumentDeleted(id);
        }
    }

    return (
        <div>
            <h2>Your Documents</h2>

            {documents.map((doc) => (
                <div
                    key={doc.id}
                    className={
                        selectedDocumentId === doc.id
                            ? "document-card selected-document"
                            : "document-card"
                    }
                    onClick={() => setDocumentId(doc.id)}
                >
                    <span>
                        {doc.filename}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(doc.id);
                        }}
                    >
                        Delete
                    </button>

                </div>
            ))}

        </div>
    );
}


export default DocumentsList;