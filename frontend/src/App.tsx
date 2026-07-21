import { useEffect, useState } from "react";
import UploadDocument from "./components/UploadDocument";
import ChatDocument from "./components/chatAboutDocument";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [summary, setSummary] = useState<string>("");
  const [summaryOpen, setSummaryOpen] = useState(true);

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
        <section className={`summary ${summaryOpen ? "open" : "collapsed"}`}>
          <div className="summary-header">
            <h2>Summary</h2>

            <button onClick={() => setSummaryOpen(!summaryOpen)}>
              {summaryOpen ? "Collapse" : "Expand"}
            </button>
          </div>

          {summaryOpen && (
            <div className="summary-content">
              <h3>Overview</h3>
              <p>{summary}</p>

              <h3>Research Question</h3>
              <p>
                The main problem addressed by this document...
              </p>

              <h3>Methodology</h3>
              <p>
                The approach and methods used are summarized here...
              </p>

              <h3>Key Findings</h3>
              <ul>
                <li>Main contribution</li>
                <li>Important result</li>
                <li>Major conclusion</li>
              </ul>

              <h3>Limitations</h3>
              <p>
                Potential weaknesses and constraints...
              </p>
            </div>
          )}
        </section>
      )}

      <section className="chat-section">
        <ChatDocument />
      </section>
    </div>
  );
}

export default App;