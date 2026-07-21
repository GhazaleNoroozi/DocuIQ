import { useState } from "react";

function ChatAboutDocument() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    async function askQuestion() {
        if (!question) return;

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

        setAnswer(data.answer);
    }

    return (
    <div>

        <h2>Ask about your document</h2>
        
        <div className="answer-area">
            {answer && (
                <>
                    <h3>Answer:</h3>
                    <p>{answer}</p>
                </>
            )}
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

    </div>
    );
}

export default ChatAboutDocument;