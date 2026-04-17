import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const API = "https://ai-backend-fxj9.onrender.com";

const GroupChat = () => {
  const { state } = useLocation();
  const group = state?.group;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const token = localStorage.getItem("token");

  // ✅ FETCH MESSAGES FROM BACKEND
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API}/api/groups/${group?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(res.data.messages || []);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };

    if (group?._id) fetchMessages();
  }, [group]);

  // ✅ SEND MESSAGE TO BACKEND
  const handleSend = async () => {
    if (!text) return;

    try {
      const res = await axios.post(
        `${API}/api/groups/message`,
        {
          groupId: group._id,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.log("Send error:", err);
    }
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
              {msg.sender?.name || "User"} •{" "}
              {new Date(msg.createdAt).toLocaleTimeString()}
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