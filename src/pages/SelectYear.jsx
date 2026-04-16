import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const years = [
  { id: 1, short: "Y1", title: "Year 1", desc: "Foundation Level" },
  { id: 2, short: "Y2", title: "Year 2", desc: "Specialization" },
  { id: 3, short: "Y3", title: "Year 3", desc: "Advanced Studies" },
];

const SelectYear = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Get course from previous page
  const course = location.state?.course || localStorage.getItem("selectedCourse");

  const handleSelect = (year) => {
    // ✅ Only allow Year 3
    if (year.id !== 3) {
      alert("Only Year 3 is available for now 🚧");
      return;
    }

    setSelected(year.id);
  };

  const handleContinue = () => {
    if (!selected) return;

    const selectedYear = years.find(y => y.id === selected);

    // ✅ Save year
    localStorage.setItem("selectedYear", selectedYear.title);

    // ✅ Go to MODULES page (not course again)
    navigate("/modules-course", {
      state: {
        course,
        year: selectedYear.title
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-4xl">

        {/* TITLE */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            Which year?
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            {course || "Selected Course"}
          </p>
        </div>

        {/* YEAR CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          {years.map((year) => (
            <div
              key={year.id}
              onClick={() => handleSelect(year)} // ✅ updated
              className={`cursor-pointer rounded-2xl p-5 sm:p-6 text-center transition shadow-sm ${
                selected === year.id
                  ? "bg-purple-600 text-white shadow-md"
                  : "bg-white hover:shadow-md"
              }`}
            >
              <div
                className={`w-16 h-16 mx-auto flex items-center justify-center rounded-full mb-3 sm:mb-4 ${
                  selected === year.id
                    ? "bg-white text-purple-600"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                <span className="font-bold text-lg">{year.short}</span>
              </div>

              <p className="font-semibold text-lg">{year.title}</p>
              <p
                className={`text-sm mt-1 ${
                  selected === year.id ? "text-purple-100" : "text-gray-500"
                }`}
              >
                {year.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CONTINUE BUTTON */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full py-3 sm:py-4 rounded-xl font-medium transition ${
            selected
              ? "bg-purple-700 text-white hover:bg-purple-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue Planning
        </button>

        {/* BACK */}
        <div className="text-center mt-4 sm:mt-6">
          <button
            onClick={() => navigate("/course-selection")}
            className="text-gray-500 text-sm hover:underline"
          >
            ← Change course
          </button>
        </div>

      </div>
    </div>
  );
};

export default SelectYear;