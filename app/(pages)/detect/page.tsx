"use client";
import { useState } from "react";
import axios from "axios";

type FactCheckResult =
  | {
      type: "ai";
      answer: string;
    }
  | {
      type: "fact";
      results: {
        verdict: string;
        score: number;
        evidence: string;
        source: string;
      }[];
    };

export default function Detect() {
  const [claim, setClaim] = useState("");
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    const res = await axios.post("/api/detect", { claim });
    setResult(res.data as FactCheckResult);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Fact Checker</h1>
      <input
        type="text"
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        placeholder="Enter your claim..."
        className="border border-gray-300 p-3 rounded w-full max-w-md"
      />
      <button
        onClick={handleCheck}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Checking..." : "Check Fact"}
      </button>

      {result && (
        <div className="mt-8 w-full max-w-2xl bg-white p-6 rounded shadow">
          {result.type === "ai" ? (
            <p className="text-green-600">{result.answer}</p>
          ) : (
            result.results.map((r, idx) => (
              <div key={idx} className="mb-4 border-b pb-4">
                <p>
                  <strong>Verdict:</strong> {r.verdict}
                </p>
                <p>
                  <strong>Score:</strong> {r.score}
                </p>
                <p>
                  <strong>Evidence:</strong> {r.evidence}
                </p>
                <a
                  href={r.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {r.source}
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}