"use client";

import { useState, useEffect } from "react";

interface Result {
  timestamp: number;
  result: Record<string, unknown>;
}

export default function Detecti() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<Result[]>([]);
  const [result, setResult] = useState<Record<string, unknown> | null>(null);

  // Load history from localStorage (and remove expired)
  useEffect(() => {
    const stored = localStorage.getItem("ai_history");
    if (stored) {
      const parsed: Result[] = JSON.parse(stored);
      const now = Date.now();
      const fresh = parsed.filter(
        (entry) => now - entry.timestamp < 3 * 24 * 60 * 60 * 1000
      );
      setHistory(fresh);
      localStorage.setItem("ai_history", JSON.stringify(fresh));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!validTypes.includes(selectedFile.type)) {
      alert("Only PNG, JPEG, or JPG files are supported.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/detecti", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.result);

      const newHistory = [
        { timestamp: Date.now(), result: data.result },
        ...history,
      ];
      setHistory(newHistory);
      localStorage.setItem("ai_history", JSON.stringify(newHistory));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">AI Image Detector</h1>

      <div className="w-full max-w-md space-y-4">
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="w-full bg-white border rounded p-2"
        />

        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Detecting..." : "Detect AI-Generated"}
        </button>

        {result && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-lg">Result:</h2>
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {history.length > 0 && (
          <div className="bg-white p-4 rounded shadow mt-6">
            <h2 className="font-bold text-lg mb-2">Past Detections</h2>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item, idx) => (
                <li key={idx} className="border p-2 rounded bg-gray-50 text-xs">
                  <div className="font-medium">
                    Time: {new Date(item.timestamp).toLocaleString()}
                  </div>
                  <pre className="overflow-x-auto">
                    {JSON.stringify(item.result, null, 1)}
                  </pre>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
