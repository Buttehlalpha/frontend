import { useState } from "react";
import axios from "axios";

const AddTaskModal = ({ close }) => {
  const [form, setForm] = useState({
    module: "",
    title: "",
    deadline: "",
    priority: "medium",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // ✅ alert system

  const modules = JSON.parse(
    localStorage.getItem("selectedModules") || "[]"
  );

  const userId = localStorage.getItem("userId");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage(null);

      if (!form.module || !form.title || !form.deadline) {
        setMessage({ type: "error", text: "⚠️ Please fill all fields" });
        setLoading(false);
        return;
      }

      await axios.post("http://localhost:5000/api/assignment/add", {
        userId,
        module: form.module,
        title: form.title,
        date: form.deadline,
        priority: form.priority,
        status: "pending"
      });

      // ✅ SUCCESS ALERT (modify alert system)
      setMessage({ type: "success", text: " Task added successfully!" });

      setTimeout(() => {
        close();
      }, 1200);

    } catch (err) {
      console.log(err);

      // ❌ ERROR ALERT
      setMessage({ type: "error", text: "❌ Failed to add task" });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Quick Add Task</h2>
          <button onClick={close}>✕</button>
        </div>

        {/* 🔔 ALERT BOX (MODIFY ALERT SYSTEM) */}
        {message && (
          <div
            className={`p-2 mb-3 rounded text-sm text-white ${
              message.type === "success"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* MODULE */}
        <select
          name="module"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="">Select module...</option>
          {modules.map((m, i) => (
            <option key={i} value={m}>{m}</option>
          ))}
        </select>

        {/* TITLE */}
        <input
          name="title"
          placeholder="Assignment title"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        {/* DATE */}
        <input
          type="date"
          name="deadline"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        {/* PRIORITY */}
        <select
          name="priority"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 rounded-lg"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>

      </div>
    </div>
  );
};

export default AddTaskModal;