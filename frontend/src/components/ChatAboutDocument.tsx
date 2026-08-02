import { useState } from "react";

type ChatAboutDocumentProps = {
    documentId: number | null;
};

function ChatAboutDocument({ documentId }: ChatAboutDocumentProps) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
    

    async function askQuestion() {
        if (!question) return;

        setMessages(prev => [
            ...prev,
            { role: "user", text: question }
        ]);

        setLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(
            `${API_URL}/api/documents/chat`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    question,
                    documentId,
                }),
            }
        );

        const data = await response.json();

        setMessages(prev => [
            ...prev,
            { role: "assistant", text: data.answer }
        ]);

        setLoading(false);
        setQuestion("");
    }

    return (
    <section className="document-section chat">
        <div className="section-header">
            <h2>Ask about your document</h2>
        </div>
        
        <div className="section-content">
            <div className="answer-area">   
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        {msg.text}
                    </div>
                ))}

                {loading && (
                    <div className="message assistant thinking">
                        DocuIQ is thinking...
                    </div>
                )}
            </div>
        </div>
        <form 
            className="input-area" 
            onSubmit={(e) => {
                e.preventDefault();
                askQuestion();
            }}
        >
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
            />

            <button type="submit">
                Ask
            </button>
        </form>
    </section>
    );
}

export default ChatAboutDocument;