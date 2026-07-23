import { useEffect, useState } from "react";
import UploadDocument from "./components/UploadDocument";
import ChatDocument from "./components/ChatAboutDocument";
import Summary from "./components/Summary";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
      });
  }, []);

  return (
    <div className="app">
      <header>
        <h1>DocuIQ</h1>
        <p>{message}</p>
      </header>

      <UploadDocument setSummary={setSummary} />

      {summary && (
        <Summary summary={summary} />
        )}

      <ChatDocument />
    </div>
  );
}

export default App;