
import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const updatedConv = [...conversation, userMessage];
    setConversation(updatedConv);
    setLoading(true);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedConv }),
      });
      const json = await res.json();
      const aiMessage = json.choices[0].message;
      setConversation((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setConversation((prev) => [...prev, { role: 'system', content: 'Error contacting AI.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chat with OpenRouter AI</h1>
      <div className="space-y-2 mb-4">
        {conversation.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span
              className={`${m.role === 'user' ? 'bg-blue-200' : 'bg-gray-200'} rounded px-3 py-1 inline-block`}
            >
              {m.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </div>
  );
}