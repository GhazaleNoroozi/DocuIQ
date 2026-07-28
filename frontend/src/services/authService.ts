const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`



export async function signup(
    email: string,
    password: string,
    username: string
) {
    const response = await fetch(
        `${API_URL}/signup`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password,
                username
            })
        }
    );

    return response.json();
}


export async function login(
    email: string,
    password: string
) {
    const response = await fetch(
        `${API_URL}/login`,
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