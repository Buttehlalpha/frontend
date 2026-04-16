import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Megaphone, Briefcase, Monitor } from "lucide-react";
import { toast } from "react-toastify";

const courses = [
  { id: 1, title: "Accounting and Finance", students: "34 active students this semester", icon: <GraduationCap size={20} /> },
  { id: 2, title: "Advertising, Public Relations and Branding", students: "21 active students this semester", icon: <Megaphone size={20} /> },
  { id: 3, title: "Business Management", students: "56 active students this semester", icon: <Briefcase size={20} /> },
  { id: 4, title: "Information Technology", students: "42 active students this semester", icon: <Monitor size={20} /> },
];

const CourseSelection = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (course) => {
    // ❌ OLD: alert(...)
    // ✅ NEW: toast
    if (course.title !== "Information Technology") {
      toast.error("Only Information Technology is available for now 🚧");
      return;
    }

    setSelected(course.id);
  };

  const handleContinue = () => {
    if (!selected) return;

    const selectedCourse = courses.find(c => c.id === selected);

    localStorage.setItem("selectedCourse", selectedCourse.title);

    navigate("/year", {
      state: { course: selectedCourse.title }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-3xl">

        {/* STEP INDICATOR */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm">
              ✓
            </div>
            <span className="text-xs font-semibold text-gray-600">YEAR</span>
          </div>

          <div className="w-10 h-[2px] bg-purple-600" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm">
              2
            </div>
            <span className="text-xs font-semibold text-purple-600">COURSE</span>
          </div>

          <div className="w-10 h-[2px] bg-gray-300" />

          <div className="flex items-center gap-2 opacity-40">
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-sm">
              3
            </div>
            <span className="text-xs font-semibold">DASHBOARD</span>
          </div>

        </div>

        {/* TITLE */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            What are you studying?
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Select your course to continue.
          </p>
        </div>

        {/* COURSE LIST */}
        <div className="space-y-3 sm:space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => handleSelect(course)}
              className={`flex items-center justify-between rounded-xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 shadow-sm transition cursor-pointer ${
                selected === course.id
                  ? "bg-purple-600 text-white"
                  : "bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                    selected === course.id
                      ? "bg-white text-purple-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {course.icon}
                </div>

                <div>
                  <p className="font-semibold text-sm sm:text-base">
                    {course.title}
                  </p>
                  <p className="text-xs opacity-80">
                    {course.students}
                  </p>
                </div>
              </div>

              <div className="text-xl">›</div>
            </div>
          ))}
        </div>

        {/* CONTINUE BUTTON */}
        <button
          onClick={handleContinue}
          disabled={!selected}
          className={`w-full mt-6 py-3 sm:py-4 rounded-xl font-medium transition ${
            selected
              ? "bg-purple-700 text-white hover:bg-purple-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

      </div>
    </div>
  );
};

export default CourseSelection;