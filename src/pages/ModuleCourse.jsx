import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const modulesList = [
  "Full Stack Programming",
  "Individual Project",
  "Innovation and Technology Management",
  "Business Intelligence",
  "Human-Computer Interaction",
  "Digital Business and Management",
];

const ModuleCourse = () => {
  const [selectedModules, setSelectedModules] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get data safely (state + localStorage fallback)
  const course =
    location.state?.course || localStorage.getItem("selectedCourse");

  const year =
    location.state?.year || localStorage.getItem("selectedYear");

  // 🚫 GUARD (prevent empty page)
  if (!course || !year) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">
            ❌ Missing course or year
          </h2>
          <p className="text-gray-500 mt-2">
            Please restart your selection
          </p>

          <button
            onClick={() => navigate("/course-selection")}
            className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  // 🚫 LIMIT ACCESS (IT + Year 3 only)
  if (course !== "Information Technology" || year !== "Year 3") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">
            🚧 Access Restricted
          </h2>
          <p className="text-gray-500 mt-2">
            Modules only available for IT - Year 3
          </p>

          <button
            onClick={() => navigate("/course-selection")}
            className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // ✅ Toggle module selection
  const handleSelect = (module) => {
    if (selectedModules.includes(module)) {
      setSelectedModules(selectedModules.filter((m) => m !== module));
    } else {
      setSelectedModules([...selectedModules, module]);
    }
  };

  // ✅ Continue
  const handleContinue = () => {
    if (selectedModules.length === 0) {
      return alert("Please select at least one module 📚");
    }

    localStorage.setItem(
      "selectedModules",
      JSON.stringify(selectedModules)
    );

    navigate("/dashboard", {
      state: {
        modules: selectedModules,
        course,
        year,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl">

        {/* TITLE */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Select Modules
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {course} - {year}
          </p>
        </div>

        {/* MODULE LIST */}
        <div className="space-y-3">
          {modulesList.map((module, index) => (
            <div
              key={index}
              onClick={() => handleSelect(module)}
              className={`cursor-pointer rounded-xl p-4 transition shadow-sm ${
                selectedModules.includes(module)
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:shadow-md"
              }`}
            >
              <p className="font-medium">{module}</p>
            </div>
          ))}
        </div>

        {/* CONTINUE BUTTON */}
        <button
          onClick={handleContinue}
          disabled={selectedModules.length === 0}
          className={`w-full mt-6 py-3 rounded-xl font-medium transition ${
            selectedModules.length > 0
              ? "bg-purple-700 text-white hover:bg-purple-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue to Dashboard
        </button>

        {/* BACK */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/year")}
            className="text-gray-500 text-sm hover:underline"
          >
            ← Change year
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModuleCourse;