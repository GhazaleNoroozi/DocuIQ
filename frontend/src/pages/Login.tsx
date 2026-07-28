import { useState } from "react";
import { login } from "../services/authService";


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");


    async function handleLogin() {

        const data = await login(
            email,
            password
        );


        if (data.token) {

            localStorage.setItem(
                "token",
                data.token
            );

            window.location.href = "/dashboard";

        } else {

            setMessage(
                data.message || "Invalid email or password"
            );

            // clear inputs
            setEmail("");
            setPassword("");
        }
    }


    return (
        <div>

            <h1>Login</h1>


            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />


            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />


            <button onClick={handleLogin}>
                Login
            </button>


            <p>
                {message}
            </p>

        </div>
    );
}


export default Login;