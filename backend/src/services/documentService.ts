let currentDocument = "";

export function setCurrentDocument(text: string) {
    currentDocument = text;
}

export function getCurrentDocument() {
    return currentDocument;
}