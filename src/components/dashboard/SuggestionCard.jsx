import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateSuggestion } from "../../utils/aiSuggestion";

const SuggestionCard = () => {
  const [suggestion, setSuggestion] = useState("Loading AI suggestion...");
  const navigate = useNavigate();

  useEffect(() => {
    const loadAI = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // 📊 Get sessions
        const res = await axios.get(
          `http://localhost:5000/api/study/${userId}`
        );

        const sessions = res.data;

        // 📚 Get modules
        const modules = JSON.parse(
          localStorage.getItem("selectedModules") || "[]"
        );

        // 🔥 TRY REAL AI FIRST
        try {
          const aiRes = await axios.post(
            "http://localhost:5000/api/ai/suggest",
            {
              modules,
              sessions,
            }
          );

          setSuggestion(aiRes.data.suggestion);

        } catch (aiError) {
          console.log("⚠️ AI failed, using fallback");

          // 🧠 FALLBACK TO YOUR LOGIC AI
          const fallback = generateSuggestion(sessions, modules);
          setSuggestion(fallback);
        }

      } catch (err) {
        console.log(err);
        setSuggestion("Unable to load AI suggestion ❌");
      }
    };

    loadAI();
  }, []);

  // 🚀 Start Focus Mode
  const handleStart = () => {
    const modules = JSON.parse(
      localStorage.getItem("selectedModules") || "[]"
    );

    if (modules.length === 0) {
      return alert("Select modules first 📚");
    }

    navigate("/focus-session", {
      state: {
        module: modules[0],
      },
    });
  };

  return (
    <div className="bg-gradient-to-r from-purple-200 to-purple-300 p-6 rounded-2xl shadow">
      
      <p className="text-sm text-purple-700 font-semibold">
        🤖 AI SUGGESTION
      </p>

      <h3 className="text-lg md:text-xl font-semibold mt-2">
        Smart Study Recommendation
      </h3>

      <p className="text-sm text-gray-700 mt-2">
        {suggestion}
      </p>

      <button
        onClick={handleStart}
        className="mt-4 bg-purple-700 text-white px-5 py-2 rounded-lg hover:bg-purple-800 transition"
      >
        Start Session
      </button>
    </div>
  );
};

export default SuggestionCard;