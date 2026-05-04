import React, { useMemo, useState } from "react";

function synthesizeAnswer(prompt) {
  if (!prompt.trim()) return "Ask a question to get a quick answer draft.";
  return `Suggested response: ${prompt.trim().slice(0, 120)} ...`;
}

export default function Widget() {
  const [prompt, setPrompt] = useState("How should we structure a RAG runbook?");
  const answer = useMemo(() => synthesizeAnswer(prompt), [prompt]);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <label htmlFor="prompt-box">Prompt</label>
      <textarea
        id="prompt-box"
        rows={4}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        style={{ width: "100%", borderRadius: 8, border: "1px solid #94a3b8", padding: 10 }}
      />
      <div style={{ borderRadius: 8, background: "#e2e8f0", padding: 10, color: "#0f172a" }}>{answer}</div>
    </div>
  );
}
