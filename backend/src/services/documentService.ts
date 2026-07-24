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