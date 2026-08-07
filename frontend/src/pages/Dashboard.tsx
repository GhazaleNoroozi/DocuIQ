import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UploadDocument from "../components/UploadDocument";
import ChatDocument from "../components/ChatAboutDocument";
import Summary from "../components/Summary";
import DocumentsList from "../components/DocumentsList";

import "../App.css";


function Dashboard() {

    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [summary, setSummary] = useState<string>("");
    const [documentId, setDocumentId] = useState<number | null>(null);
    const API_URL = import.meta.env.VITE_API_URL;


    function logout() {
        localStorage.removeItem("token");
        navigate("/login");
    }


    useEffect(() => {
        fetch(`${API_URL}/api/message`)
            .then(res => res.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(err => {
                console.error(err);
            });
    }, []);


    return (
        <div className="app">
            <header>
                <h1>DocuIQ</h1>
                <p>{message}</p>
                <button onClick={logout}>
                    Logout
                </button>
            </header>
            <DocumentsList
                setDocumentId={setDocumentId}
            />
            <UploadDocument
                setSummary={setSummary}
                setDocumentId={setDocumentId}
            />

            {summary && (
                <Summary summary={summary} />
            )}

            <ChatDocument documentId={documentId}/>
        </div>
    );
}


export default Dashboard;