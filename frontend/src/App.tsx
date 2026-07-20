import { useEffect, useState } from "react";
import UploadDocument from "./components/UploadDocument";


function App() {

  const [message, setMessage] = useState("");

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
      <UploadDocument />
    </>
  );
}

export default App;