import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// 📄 PDFs
import fullstack from "../assets/pdfs/fullstack.pdf";
import project from "../assets/pdfs/project.pdf";
import innovation from "../assets/pdfs/innovation.pdf";
import bi from "../assets/pdfs/bi.pdf";
import hci from "../assets/pdfs/hci.pdf";
import digital from "../assets/pdfs/digital.pdf";

// 📌 MODULE → PDF MAP
const pdfMap = {
  "Full Stack Programming": fullstack,
  "Individual Project": project,
  "Innovation and Technology Management": innovation,
  "Business Intelligence": bi,
  "Human-Computer Interaction": hci,
  "Digital Business and Management": digital,
};

const FocusSession = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ FIX: PWA SAFE MODULE RECOVERY
  const module =
    location.state?.module || localStorage.getItem("activeModule");

  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(0);

  const intervalRef = useRef(null);
  const hasShownBreak = useRef(false);

  // ⏱ START TIMER
  const handleStart = (minutes) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialTime(seconds);
    setIsRunning(true);
    hasShownBreak.current = false;
  };

  // ⏱ TIMER ENGINE
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // 🧠 SESSION COMPLETE
  useEffect(() => {
    if (timeLeft <= 0 && isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setTimeLeft(0);

      handleSave();

      alert("🎉 Session Completed!");
      navigate("/dashboard");
    }
  }, [timeLeft]);

  // ☕ HALF BREAK
  useEffect(() => {
    if (!initialTime) return;

    const halfTime = Math.floor(initialTime / 2);

    if (timeLeft === halfTime && !hasShownBreak.current) {
      hasShownBreak.current = true;
      alert("☕ Take a short break!");
    }
  }, [timeLeft, initialTime]);

  // 💾 SAVE TO MONGODB (FIXED)
  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const moduleName =
        module || localStorage.getItem("activeModule");

      if (!userId || !moduleName) return;

      const timeSpent = Math.floor(
        (initialTime - timeLeft) / 60
      );

      if (timeSpent <= 0) return;

      await axios.post("http://localhost:5000/api/study/add", {
        userId,
        module: moduleName,
        timeSpent,
      });

      console.log("✅ Session saved:", timeSpent, "minutes");
    } catch (err) {
      console.log("❌ Save error:", err);
    }
  };

  // ⏱ FORMAT TIME
  const formatTime = (sec) => {
    const mins = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${mins}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">

      {/* MODULE TITLE */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        {module || "Focus Mode"}
      </h1>

      {/* TIME SELECT */}
      {!isRunning && timeLeft === 0 && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => handleStart(25)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            25 min
          </button>

          <button
            onClick={() => handleStart(45)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            45 min
          </button>

          <button
            onClick={() => handleStart(60)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            60 min
          </button>
        </div>
      )}

      {/* TIMER */}
      {timeLeft > 0 && (
        <>
          <div className="text-5xl font-bold mb-6">
            {formatTime(timeLeft)}
          </div>

          {/* CONTROLS */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
            >
              {isRunning ? "Pause" : "Resume"}
            </button>

            <button
              onClick={async () => {
                clearInterval(intervalRef.current);
                await handleSave();
                setTimeLeft(0);
                setIsRunning(false);
                navigate("/dashboard");
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg"
            >
              End Session
            </button>
          </div>
        </>
      )}

      {/* PDF VIEWER */}
      {timeLeft > 0 && (
        <div className="w-full max-w-5xl mt-6">
          {pdfMap[module] ? (
            <iframe
              src={pdfMap[module]}
              className="w-full h-[600px] rounded-xl border"
              title="PDF Viewer"
            />
          ) : (
            <div className="bg-white p-6 rounded-xl text-center">
              ❌ No PDF found for <b>{module}</b>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default FocusSession;