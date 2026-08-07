import { apiFetch } from "./api";

const API_URL = import.meta.env.VITE_API_URL;


export async function getDocuments() {

    const response = await apiFetch(
        `${API_URL}/api/documents`
    );

    if (!response) return null;

    const data = await response.json();

    return data.documents;
}

export async function getDocument(id: number) {

    const response = await apiFetch(
        `${API_URL}/api/documents/${id}`
    );

    if (!response) return null;

    const data = await response.json();

    return data.document;
}