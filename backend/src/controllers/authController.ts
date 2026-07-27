import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../services/userService";


export async function signup(
    req: Request,
    res: Response
) {
    try {
        const { email, password } = req.body;

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }


        const passwordHash = await bcrypt.hash(
            password,
            10
        );


        const user = await createUser(
            email,
            passwordHash
        );


        res.json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Signup failed"
        });
    }
}