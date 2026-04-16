import { useNavigate, useLocation } from "react-router-dom";

const FocusMode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ SAFE DATA SOURCE (FIX)
  const modulesFromState = location.state?.modules;

  const modules =
    modulesFromState ||
    JSON.parse(localStorage.getItem("selectedModules") || "[]");

  const handleSelect = (mod) => {
    localStorage.setItem("activeModule", mod);

    navigate("/focus-session", {
      state: { module: mod },
    });
  };

  // 🚨 EMPTY FIX SCREEN
  if (!modules || modules.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold">No Modules Found</h2>
          <p className="text-gray-500 mt-2">
            Please go back and select modules
          </p>

          <button
            onClick={() => navigate("/course-selection")}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
          >
            Restart Setup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Select Module 📚
      </h1>

      <div className="max-w-2xl mx-auto space-y-4">
        {modules.map((mod, i) => (
          <div
            key={i}
            onClick={() => handleSelect(mod)}
            className="bg-white p-4 rounded-xl shadow cursor-pointer hover:shadow-md"
          >
            {mod}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusMode;