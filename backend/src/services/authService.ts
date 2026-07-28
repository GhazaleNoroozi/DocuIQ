import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "./userService";


export async function authenticateUser(
    email: string,
    password: string
) {
    const user = await getUserByEmail(email);

    if (!user) {
        return null;
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatch) {
        return null;
    }

    return user;
}


export function generateToken(user: any) {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "1h"
        }
    );
}

export async function login(
    email: string,
    password: string
) {
    const response = await fetch(
        `${process.env.API_URL}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    return response.json();
}