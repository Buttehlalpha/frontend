import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import Greeting from "../components/dashboard/Greeting";
import SuggestionCard from "../components/dashboard/SuggestionCard";
import StatsCards from "../components/dashboard/StatsCards";
import WeeklyChart from "../components/dashboard/WeeklyChart";
import Deadlines from "../components/dashboard/Deadlines";
import AddTaskModal from "../components/dashboard/AddTaskModal";

import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  // ✅ ADD THIS
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 md:ml-20 pb-20 md:pb-6">

        <Topbar />

        <div className="p-4 md:p-6 space-y-6">

          <Greeting />

          <div className="grid md:grid-cols-3 gap-6">

            <div className="md:col-span-2">
              <SuggestionCard />
            </div>

            <div className="space-y-4">

              {/* ✅ Focus Mode */}
              <div
                onClick={() => navigate("/focus-mode")}
                className="bg-purple-800 p-4 rounded-xl cursor-pointer hover:bg-purple-700 transition"
              >
                <h4 className="font-semibold text-white">⏱ Focus Mode</h4>
                <p className="text-sm text-white">
                  Start reading session
                </p>
              </div>

              {/* ✅ FIXED ADD TASK */}
              <div
                onClick={() => setShowModal(true)}
                className="bg-yellow-100 p-4 rounded-xl cursor-pointer hover:bg-yellow-200 transition"
              >
                <h4 className="font-semibold">➕ Add Task</h4>
                <p className="text-sm text-gray-600">
                  New deadline or reminder
                </p>
              </div>

            </div>
          </div>

          <StatsCards />

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <WeeklyChart />
            </div>

            <Deadlines />
          </div>

        </div>
      </div>

      {/* ✅ MODAL */}
      {showModal && (
        <AddTaskModal close={() => setShowModal(false)} />
      )}

    </div>
  );
};

export default Dashboard;