"use client";
import { useState } from "react";

export default function AiPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    setResponse(data.message);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded-xl bg-white dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4">Ask Poudel AI</h1>
      <textarea
        className="w-full p-2 border rounded mb-2 text-black"
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask a question..."
      />
      <button
        onClick={askAI}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask"}
      </button>

      {response && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
