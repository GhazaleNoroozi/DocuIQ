import { useEffect, useState } from "react";
import UploadDocument from "./components/UploadDocument";
import ChatDocument from "./components/ChatAboutDocument";


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
    <>
      <h1>DocuIQ</h1>
      <p>{message}</p>
      <UploadDocument setSummary={setSummary} />
      <ChatDocument />
      {summary && (<div>
        <h2>Summary</h2>
        <p>{summary}</p>
      </div>
      )}

    </>
  );
}

export default App;