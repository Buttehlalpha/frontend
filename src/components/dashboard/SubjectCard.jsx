import { useNavigate } from "react-router-dom";

const SubjectCard = ({ title, desc, icon }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 📚 Save last opened module (optional AI tracking later)
    localStorage.setItem("lastModule", title);

    // 🚀 Go to Focus Session
    navigate("/focus-session", {
      state: {
        module: title,
      },
    });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white p-5 rounded-xl hover:shadow-lg hover:scale-[1.02] transition cursor-pointer active:scale-95"
    >
      {/* ICON */}
      <div className="mb-3 text-purple-600 text-2xl">
        {icon}
      </div>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800">
        {title}
      </h3>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mt-2">
        {desc}
      </p>

      {/* CTA */}
      <div className="mt-4 text-xs text-purple-600 font-medium">
        Start Focus →
      </div>
    </div>
  );
};

export default SubjectCard;