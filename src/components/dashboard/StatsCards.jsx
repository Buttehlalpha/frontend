import axios from "axios";
import { useEffect, useState } from "react";

const StatsCards = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        if (!userId) return;

        const res = await axios.get(
          `http://localhost:5000/api/study/${userId}`
        );

        setSessions(res.data || []);
      } catch (err) {
        console.log("Error fetching study data:", err);
      }
    };

    fetchData();
  }, []);

  const totalMinutes = sessions.reduce(
    (sum, s) => sum + (s.timeSpent || 0),
    0
  );

  const hours = (totalMinutes / 60).toFixed(1);

  const progress = sessions.length
    ? Math.round((sessions.length / 6) * 100)
    : 0;

  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500">STUDY HOURS</p>
        <h3 className="text-2xl font-bold mt-2">{hours}h</h3>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500">COMPLETED</p>
        <h3 className="text-2xl font-bold mt-2">
          {sessions.length}/6
        </h3>
      </div>

      <div className="bg-white p-5 rounded-xl shadow">
        <p className="text-sm text-gray-500">ON TRACK</p>
        <h3 className="text-2xl font-bold mt-2">{progress}%</h3>
      </div>

    </div>
  );
};

export default StatsCards;