import { useEffect, useState } from "react";

const Topbar = () => {
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Get initials (A, AB, etc.)
  const getInitials = (name) => {
    if (!name) return "U";

    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 md:px-6 py-3 shadow-sm">

      {/* Search */}
      <input
        type="text"
        placeholder="Search courses or tasks..."
        className="w-full md:w-1/2 bg-gray-100 px-4 py-2 rounded-full outline-none"
      />

      {/* Profile */}
      <div className="hidden md:flex items-center gap-3 ml-4">

        {/* TEXT */}
        <div className="text-right">
          <p className="text-sm font-medium">
            {user?.name || "Student"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.year || "Year"}
          </p>
        </div>

        {/* INITIALS AVATAR */}
        <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
          {getInitials(user?.name)}
        </div>

      </div>
    </div>
  );
};

export default Topbar;