import { pool } from "../db";
import bcrypt from "bcrypt";

export async function createUser(
    email: string,
    passwordHash: string
) {
    const result = await pool.query(
        `
        INSERT INTO users(email, password_hash)
        VALUES($1, $2)
        RETURNING id, email, created_at
        `,
        [email, passwordHash]
    );

    return result.rows[0];
}



export async function getUserByEmail(email: string) {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
}

export async function validateUser(
    email: string,
    password: string
) {
    const user = await getUserByEmail(email);

    if (!user) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return null;
    }

    return user;
}
