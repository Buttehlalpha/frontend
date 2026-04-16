import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "axios";

const ModuleCard = ({ title, open = false }) => {
  const [isOpen, setIsOpen] = useState(open);
  const [assignments, setAssignments] = useState([]);

  const [form, setForm] = useState({
    title: "",
    deadline: "",
    priority: "medium",
  });

  const userId = localStorage.getItem("userId");

  // ✅ FETCH ASSIGNMENTS
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/assignment/${userId}/${title}`
        );
        setAssignments(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (isOpen) fetchAssignments();
  }, [isOpen]);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ ADD ASSIGNMENT
  const handleAdd = async () => {
    try {
      if (!form.title || !form.deadline) {
        return alert("Fill all fields ⚠️");
      }

      const res = await axios.post(
        "http://localhost:5000/api/assignment/add",
        {
          userId,
          module: title,
          ...form,
        }
      );

      // 🔥 Update UI instantly
      setAssignments([res.data, ...assignments]);

      // reset form
      setForm({
        title: "",
        deadline: "",
        priority: "medium",
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">

      {/* HEADER */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer"
      >
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-500">
            {assignments.length} Assignments
          </p>
        </div>

        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      {/* CONTENT */}
      {isOpen && (
        <div className="border-t p-4 space-y-4">

          {/* ADD FORM */}
          <div className="space-y-2">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Assignment title"
              className="w-full border p-2 rounded"
            />

            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <button
              onClick={handleAdd}
              className="w-full bg-purple-600 text-white py-2 rounded"
            >
              + Add Assignment
            </button>
          </div>

          {/* LIST */}
          {assignments.map((a, i) => (
            <div
              key={i}
              className="flex justify-between bg-gray-50 p-4 rounded-xl"
            >
              <div>
                <p className="font-medium text-sm">{a.title}</p>
                <p className="text-xs text-gray-500">
                  Due: {a.deadline}
                </p>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  a.priority === "high"
                    ? "bg-red-200"
                    : a.priority === "medium"
                    ? "bg-yellow-200"
                    : "bg-green-200"
                }`}
              >
                {a.priority}
              </span>
            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ModuleCard;