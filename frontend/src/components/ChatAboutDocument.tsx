import { useState } from "react";

function ChatAboutDocument() {
    const [question, setQuestion] = useState("");
    // const [answer, setAnswer] = useState("");
    const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
    >([]);

    async function askQuestion() {
        if (!question) return;
        setMessages(prev => [
            ...prev,
            { role: "user", text: question }
        ]);
        const response = await fetch(
            "http://localhost:5000/api/documents/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    question,
                }),
            }
        );

        const data = await response.json();
        setMessages(prev => [
            ...prev,
            { role: "assistant", text: data.answer }
        ]);
        setQuestion("");
    }

    return (
    <section className="document-section chat">
        <div className="section-header">
            <h2>Ask about your document</h2>
        </div>
        
        <div className="section-content">
            <div className="answer-area">
                {messages.map((message, index) => (
                    <div key={index}>
                        <h3>
                            {message.role === "user" ? "You" : "DocuIQ"}
                        </h3>

                        <p>{message.text}</p>
                    </div> 
                ))}
            </div>
        </div>
        <div className="input-area">
            <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask a question..."
            />

            <button onClick={askQuestion}>
                Ask
            </button>
        </div>
    </section>
    );
}

export default ChatAboutDocument;