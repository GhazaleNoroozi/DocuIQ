import { Request, Response } from "express";
import { createUser, getUserByEmail} from "../services/userService";
import bcrypt from "bcrypt";
import { authenticateUser, generateToken } from "../services/authService";


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

export async function login(
    req: Request,
    res: Response
) {
     try {
        const { email, password } = req.body;
        const user = await authenticateUser(
            email,
            password
        );

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        res.json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "login failed"
        });
    }
}