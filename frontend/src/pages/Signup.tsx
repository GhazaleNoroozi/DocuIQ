import { useState } from "react";
import { signup } from "../services/authService";
import { useNavigate } from "react-router-dom";


function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    async function handleSignup() {
        try {
            const data = await signup(
                username,
                email,
                password
            );

            if (data.message === "Created successfully") {
                setMessage("Account created!");

                // go to login page
                navigate("/login");
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            console.error(error);
            setMessage("Something went wrong");
        }
    }


    return (
        <div>
            <h1>Create Account</h1>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button onClick={handleSignup}>
                Sign Up
            </button>

            <p>{message}</p>
        </div>
    );
}

export default Signup;