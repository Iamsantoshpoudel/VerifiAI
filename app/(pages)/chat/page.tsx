"use client";

import { useState, useEffect, useRef } from "react";
import {
  Send,
  Sparkles,
  MessageCircle,
  Trash2,
  Paperclip,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  attachments?: { name: string; type: string; size: number }[];
}

interface ChatData {
  messages: Message[];
  lastUpdated: number;
}

const STORAGE_KEY = "ai-chat-messages";
const STORAGE_DURATION = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

export default function AI() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Generate unique ID for messages
  const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  // Load messages from localStorage on component mount
  useEffect(() => {
    const loadMessages = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const chatData: ChatData = JSON.parse(stored);
          const currentTime = Date.now();

          // Check if data is within 3 days
          if (currentTime - chatData.lastUpdated <= STORAGE_DURATION) {
            setMessages(chatData.messages);
          } else {
            // Clear expired data
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (error) {
        console.error("Error loading messages from localStorage:", error);
      }
    };

    loadMessages();
  }, []);

  // Save messages to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        const chatData: ChatData = {
          messages,
          lastUpdated: Date.now(),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(chatData));
      } catch (error) {
        console.error("Error saving messages to localStorage:", error);
      }
    }
  }, [messages]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, loading]);

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [userInput]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSend = async () => {
    if ((!userInput.trim() && uploadedFiles.length === 0) || loading) return;

    const attachments = uploadedFiles.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }));

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: userInput.trim() || "Uploaded files",
      timestamp: Date.now(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);
    setUserInput("");
    setUploadedFiles([]);

    try {
      // Simulate API call
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000)
      );

      const responses = [
        "I understand your message and I'm here to help you with whatever you need.",
        "That's an interesting point. Let me think about this and provide you with a comprehensive response.",
        "Thank you for sharing that information. I'll do my best to assist you with your request.",
        "I see what you're asking about. Here's my detailed response to help address your question.",
        "Based on what you've shared, I can provide some insights and suggestions that might be helpful.",
      ];

      const aiReply = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: aiReply,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching:", error);
      const errorMessage: Message = {
        id: generateId(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setUploadedFiles([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div>
      {/* Header */}
      <Navbar className="" />
      {/* {/* Chat Container* */}
      <section className="bg-[rgb(194,196,254)] container top-0 relative h-[66vh] p-4 w-[92%] mx-auto over-flow:hidden rounded-xl m-10 overflow-auto custom-scrollbar">
        <div className="flex-1 rounded-b-xl flex flex-col overflow-hidden">
          <div
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6"
          >
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">
                    Welcome to AI Chat!
                  </p>
                  <p className="text-sm">
                    Start a conversation by typing a message below.
                  </p>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2 duration-300`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  className={`flex items-start gap-3 min-w-0 ${
                    msg.role === "user"
                      ? "flex-row-reverse max-w-[85%]"
                      : "max-w-[80%]"
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                        : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    }`}
                  >
                    {msg.role === "user" ? (
                      "U"
                    ) : (
                      <MessageCircle className="w-4 h-4" />
                    )}
                  </div>
                  {/* Message Bubble */}
                  <div className="flex-1 min-w-0">
                    <div
                      className={`px-6 py-4 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
                          : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                        {msg.content}
                      </p>
                      {/* File Attachments */}
                      {msg.attachments && msg.attachments.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.attachments.map((file, fileIdx) => (
                            <div
                              key={fileIdx}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                                msg.role === "user"
                                  ? "bg-blue-400/30"
                                  : "bg-gray-100"
                              }`}
                            >
                              <Paperclip className="w-4 h-4" />
                              <span className="text-xs font-medium truncate">
                                {file.name}
                              </span>
                              <span className="text-xs opacity-70">
                                ({(file.size / 1024).toFixed(1)}KB)
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      <div
                        className={`text-xs mt-2 opacity-70 ${
                          msg.role === "user"
                            ? "text-blue-100"
                            : "text-gray-500"
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Loading Animation */}
            {loading && (
              <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-start gap-3 max-w-[90%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="px-6 py-4 bg-white rounded-2xl rounded-bl-md ">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500 ml-2">
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {/* chat area bottom */}
          {/*  */}
        </div>
      </section>
      <div>
        {/*  */}
        {/* Input Area */}
        <div className="fixed bottom-5 navbar rounded-xl left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] p-4 z-10 glassy-effect">
          {/* File Upload Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2"
                >
                  <Paperclip className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-800 font-medium truncate max-w-32">
                    {file.name}
                  </span>
                  <span className="text-xs text-blue-600">
                    ({(file.size / 1024).toFixed(1)}KB)
                  </span>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-1 p-1 hover:bg-blue-200 rounded-full transition-colors"
                  >
                    <X className="w-3 h-3 text-blue-600" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <div className="relative bg-blue-100  rounded-2xl  transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent overflow-hidden">
              <textarea
                ref={textareaRef}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything..."
                rows={1}
                className="w-full bg-transparent px-4 py-4 pr-24 text-gray-800 placeholder-gray-400 resize-none focus:outline-none min-h-[56px] max-h-[120px]"
                style={{
                  height: "auto",
                  minHeight: "56px",
                }}
              />
              {/* Buttons Container Inside Input */}
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                {/* Upload Button Inside Input */}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="*/*"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                    title="Upload files"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>

                {/* Send Button Inside Input */}
                <button
                  onClick={handleSend}
                  disabled={
                    loading || (!userInput.trim() && uploadedFiles.length === 0)
                  }
                  className={`
                      relative overflow-hidden w-8 h-8 rounded-lg transition-all duration-200
                      shadow-sm hover:shadow-md transform active:scale-95 flex items-center justify-center
                      ${
                        loading ||
                        (!userInput.trim() && uploadedFiles.length === 0)
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                      }
                    `}
                >
                  <div
                    className={`
                      transition-all duration-200
                      ${loading ? "animate-spin" : ""}
                    `}
                  >
                    {loading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`w-4 h-4 ${
                          !userInput.trim() && uploadedFiles.length === 0
                            ? "text-gray-500"
                            : "text-white"
                        }`}
                      >
                        <path d="m5 12 7-7 7 7" />
                        <path d="M12 19V5" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span>{messages.length} messages stored</span>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #ffffff !important; /* <-- यहीं fix गरियो */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(156, 163, 175, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(107, 114, 128, 0.8);
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(156, 163, 175, 0.5) #ffffff;
          background: transparent;
        }

        textarea::-webkit-scrollbar-thumb {
          background-color: #9ca3af; /* Tailwind gray-400 जस्तो खरानी */
          border-radius: 3px;
        }

        textarea::-webkit-scrollbar-thumb:hover {
          background-color: #6b7280; /* Tailwind gray-600 जस्तो डार्क खरानी */
        }

        /* Firefox */
        textarea {
          scrollbar-width: thin;
          scrollbar-color: #9ca3af #ffffff; /* thumb color, track color */
        }
      `}</style>
    </div>
  );
}
