import { useEffect, useState } from "react";
import { getDocuments } from "../services/documentService";


type Document = {
    id: number;
    filename: string;
    created_at: string;
};


function DocumentsList() {

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


    return (
        <div>
            <h2>Your Documents</h2>

            {documents.map((doc) => (
                <div key={doc.id}>
                    {doc.filename}
                </div>
            ))}

        </div>
    );
}


export default DocumentsList;