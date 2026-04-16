import React, { useEffect, useState } from "react";
import Sidebar from "../dashboard/Sidebar";
import {
  User,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
  Pencil,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(false);
  const [user, setUser] = useState(null);

  // 🔐 LOAD USER
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🔓 LOGOUT
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 ml-0 md:ml-20 pb-16 md:pb-0">

        {/* TOP BAR */}
        <div className="flex justify-end items-center px-8 py-4 bg-gray-200">
          <div className="flex items-center gap-3">

            <div className="text-right">
              <p className="font-semibold text-sm">
                {user?.name || "Student"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.year || "Year"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          {/* PROFILE */}
          <div className="flex items-center gap-6 mb-10">

            <div className="relative">
              <div className="w-28 h-28 rounded-2xl bg-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <button className="absolute bottom-1 right-1 bg-purple-500 p-2 rounded-full text-white shadow">
                <Pencil size={14} />
              </button>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {user?.name || "Student"}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {user?.course || "Course"} - {user?.year || "Year"}
              </p>
            </div>

          </div>

          {/* SETTINGS CARD */}
          <div className="bg-white rounded-2xl p-8 shadow-sm max-w-4xl">

            <h2 className="font-semibold text-lg mb-6 text-gray-700">
              Account
            </h2>

            {/* ✅ VISION BOARD (CLICKABLE NOW) */}
            <div
              onClick={() => navigate("/visionBoard")}
              className="flex items-center justify-between py-4 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <User size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    Vision Board
                  </p>
                  <p className="text-xs text-gray-400">
                    Focus locked.
                  </p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </div>

            {/* NOTIFICATIONS */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Bell size={18} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    Notifications
                  </p>
                  <p className="text-xs text-gray-400">
                    Reminders & alerts
                  </p>
                </div>
              </div>

              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                  notifications ? "bg-purple-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                    notifications ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>

            {/* HELP */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <div className="bg-gray-200 p-3 rounded-xl">
                  <HelpCircle size={18} className="text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    Help & Support
                  </p>
                  <p className="text-xs text-gray-400">
                    FAQs & contact
                  </p>
                </div>
              </div>

              <ChevronRight className="text-gray-400" />
            </div>

            {/* LOGOUT */}
            <div className="mt-8">
              <button
                onClick={handleLogout}
                className="w-full border border-red-300 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;