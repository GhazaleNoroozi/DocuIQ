import { useState } from "react";

function ChatAboutDocument() {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
    >([]);
    const [loading, setLoading] = useState(false);
    

    async function askQuestion() {
        if (!question) return;

        setMessages(prev => [
            ...prev,
            { role: "user", text: question }
        ]);

        setLoading(true);

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