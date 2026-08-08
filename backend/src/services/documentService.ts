import { pool } from "../db";

export async function saveDocument(
    userId: number,
    filename: string,
    content: string,
    summary: string | undefined,
    documentHash: string
) {
    const result = await pool.query(
        `
            INSERT INTO documents
            (user_id, filename, content, summary, document_hash)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `,
        [
            userId,
            filename,
            content,
            summary,
            documentHash
        ]
    );

    return result.rows[0].id;
}


export async function getDocument(
    id: number,
    userId: number
){
    const result = await pool.query(
        `
            SELECT *
            FROM documents
            WHERE id = $1
            AND user_id = $2
        `,
        [
            id,
            userId
        ]
    );

    return result.rows[0];
}

export async function deleteDocument(
    id: number,
    userId: number
) {
    const result = await pool.query(
        `
        DELETE FROM documents
        WHERE id = $1
        AND user_id = $2
        `,
        [
            id,
            userId
        ]
    );

    return result.rowCount;
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

export async function getDocumentsByUserId(
    userId: number
){
    const result = await pool.query(
        `
            SELECT
                id,
                filename,
                created_at
            FROM documents
            WHERE user_id = $1
            ORDER BY created_at DESC
        `,
        [userId]
    );

    return result.rows;
}

export async function getDocumentByHash(
    userId: number,
    documentHash: string
) {
    const result = await pool.query(
        `
        SELECT *
        FROM documents
        WHERE user_id = $1
        AND document_hash = $2
        `,
        [
            userId,
            documentHash
        ]
    );

    return result.rows[0];
}