"use client";

import { useState } from "react";
import type { ChatRequest, ChatResponse } from "@/lib/types";
// import Navbar from "@/components/Navbar";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user's message immediately
    const newMessages = [
      ...messages,
      { role: "user" as const, content: userInput },
    ];
    setMessages(newMessages);
    setLoading(true);
    setUserInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...newMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        } as ChatRequest),
      });
      if (!res.ok) {
        const text = await res.text(); // Log the HTML response
        throw new Error(`API error: ${res.status} - ${text}`);
      }
      const data: ChatResponse = await res.json();
      const aiReply =
        data.choices?.[0]?.message?.content ?? "Sorry, no response.";
      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <main className="flex flex-col items-center relative justify-between min-h-screen p-4 text-black bg-black-50">
        <h1 className="text-3xl font-bold mb-6">OpenRouter AI Chat</h1>

        <div
          className="w-full max-w-xl bg-white shadow rounded p-4 space-y-4 mb-4 overflow-y-auto"
          style={{ maxHeight: "500px" }} // you can adjust the height!
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex  ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-blue-500 text-black"
                    : "bg-white-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="animate-pulse px-4 py-2 rounded-lg bg-black-200 text-gray-800">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="w-full max-w-xl flex gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </main>
    </>
  );
}
