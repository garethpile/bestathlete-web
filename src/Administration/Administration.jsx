import React, { useState, useEffect } from "react";
import { getSSMParameter, putSSMParameter } from "../services/adminServices"; // You'll need to implement these API calls

const SSM_KEY = "/chatgpt/prompts/plannedWorkout";

const Administration = () => {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      setStatus("");
      try {
        const value = await getSSMParameter(SSM_KEY); // Should fetch from your backend lambda API
        setPrompt(value || "");
      } catch (e) {
        setStatus("Failed to fetch current prompt.");
      }
      setLoading(false);
    };
    fetchPrompt();
  }, []);

  const savePrompt = async () => {
    setStatus("Saving...");
    try {
      await putSSMParameter(SSM_KEY, prompt); // Should call your backend lambda API
      setStatus("Prompt updated successfully.");
    } catch (e) {
      setStatus("Failed to update prompt.");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 24 }}>
      <h2>ChatGPT Prompt Administration</h2>
      {loading ? (
        <div>Loading current prompt...</div>
      ) : (
        <>
          <textarea
            style={{ width: "100%", height: 200 }}
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
          <br />
          <button onClick={savePrompt}>Save Prompt</button>
          <div style={{ marginTop: 10 }}>{status}</div>
        </>
      )}
    </div>
  );
};

export default Administration;