import { useLocation } from "react-router-dom";
import { useState } from "react";

const GroupChat = () => {
  const { state } = useLocation();
  const group = state?.group;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text) return;

    const newMsg = {
      text,
      sender: "You",
      time: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMsg]);
    setText("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* HEADER */}
      <div className="bg-purple-600 text-white p-4 font-semibold">
        {group?.name || "Group Chat"}
      </div>

      {/* CHAT */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="bg-white p-3 rounded-lg shadow-sm">
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-gray-400 mt-1">
              {msg.sender} • {msg.time}
            </p>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="p-4 bg-white flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2"
          placeholder="Type message..."
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 text-white px-4 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GroupChat;