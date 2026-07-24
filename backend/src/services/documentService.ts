import { pool } from "../db";

export async function saveDocument(
    filename: string,
    content: string,
    summary?: string
) {
    const result = await pool.query(
        `
        INSERT INTO documents (filename, content, summary)
        VALUES ($1, $2, $3)
        RETURNING id
        `,
        [filename, content, summary]
    );

    return result.rows[0].id;
}


export async function getDocument(id: number) {
    const result = await pool.query(
        `
        SELECT *
        FROM documents
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
}

export async function deleteDocument(id: number) {
    const result = await pool.query(
     `
     DELETE FROM documents
     WHERE id = $1;
     `
    );
}

export async function updateDocumentSummary(
    id: number,
    summary: string
) {
    await pool.query(
        `
        UPDATE documents
        SET summary = $1,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        `,
        [summary, id]
    );
}