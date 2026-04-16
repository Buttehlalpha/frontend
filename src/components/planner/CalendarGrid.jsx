import { useEffect, useState } from "react";
import axios from "axios";

const hours = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"
];

// Week starts from Sunday (JS getDay system)
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarGrid = () => {
  const [tasks, setTasks] = useState([]);

  // ✅ FETCH TASKS FROM BACKEND
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await axios.get(
          `http://localhost:5000/api/assignment/${userId}`
        );

        setTasks(res.data || []);
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  // 🎨 COLOR BY STATUS
  const getColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 border-green-500";
      case "pending":
      default:
        return "bg-yellow-100 border-yellow-500";
    }
  };

  // 📅 GROUP TASKS BY DAY OF WEEK
  const tasksByDay = {};

  tasks.forEach((task) => {
    if (!task.date) return;

    const dayIndex = new Date(task.date).getDay(); // 0 - 6

    if (!tasksByDay[dayIndex]) {
      tasksByDay[dayIndex] = [];
    }

    tasksByDay[dayIndex].push(task);
  });

  return (
    <div className="bg-white rounded-2xl shadow overflow-x-auto">

      {/* HEADER */}
      <div className="grid grid-cols-8 bg-purple-100 text-sm font-medium">
        <div className="p-3">TIME</div>

        {days.map((day, i) => (
          <div key={i} className="p-3 text-center">
            {day}
          </div>
        ))}
      </div>

      {/* BODY */}
      <div className="grid grid-cols-8">

        {/* TIME COLUMN */}
        <div className="border-r">
          {hours.map((h, i) => (
            <div key={i} className="h-16 text-xs text-gray-400 px-2 py-2">
              {h}
            </div>
          ))}
        </div>

        {/* DAY COLUMNS */}
        {days.map((_, dayIndex) => (
          <div key={dayIndex} className="border-r relative">

            {/* GRID ROWS */}
            {hours.map((_, i) => (
              <div key={i} className="h-16 border-b"></div>
            ))}

            {/* TASKS */}
            {(tasksByDay[dayIndex] || []).map((task, i) => (
              <div
                key={task._id || i}
                className={`absolute left-2 right-2 text-sm p-2 rounded-lg border ${getColor(
                  task.status
                )}`}
                style={{
                  top: `${(i + 2) * 80}px`,
                }}
              >
                <p className="font-semibold">{task.title}</p>

                <p className="text-xs text-gray-600">
                  {new Date(task.date).toLocaleDateString()}{" "}
                  {new Date(task.date).toLocaleTimeString()}
                </p>
              </div>
            ))}

          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="flex justify-center gap-6 p-4 bg-purple-50 text-sm">

        <span className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          Pending
        </span>

        <span className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          Completed
        </span>

      </div>

    </div>
  );
};

export default CalendarGrid;