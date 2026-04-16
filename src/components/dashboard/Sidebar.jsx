import {
  LayoutGrid,
  CalendarDays,
  BookOpen,
  User,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

const Sidebar = () => {
  const base =
    "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200";

  const active = "bg-purple-700 text-white shadow-md";
  const inactive = "text-gray-300 hover:bg-purple-800 hover:text-white";

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <div className="hidden md:flex fixed left-0 top-0 h-screen w-20 bg-purple-950 flex-col items-center py-6 space-y-8 z-50">

        {/* Logo (CIRCULAR ONLY) */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-600 shadow-md">
          <img
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Nav Items */}
        <div className="flex flex-col items-center space-y-6 mt-4">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <LayoutGrid size={22} />
          </NavLink>

          <NavLink
            to="/schedule"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <CalendarDays size={22} />
          </NavLink>

          <NavLink
            to="/modules"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <BookOpen size={22} />
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <User size={22} />
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <Settings size={22} />
          </NavLink>
        </div>

        <div className="flex-1" />
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 w-full bg-purple-950 flex justify-around items-center py-3 md:hidden z-50 border-t border-purple-800">

        <NavLink to="/dashboard" className={({ isActive }) =>
          `${base} ${isActive ? active : "text-gray-300"}`
        }>
          <LayoutGrid size={22} />
        </NavLink>

        <NavLink to="/schedule" className={({ isActive }) =>
          `${base} ${isActive ? active : "text-gray-300"}`
        }>
          <CalendarDays size={22} />
        </NavLink>

        <NavLink to="/modules" className={({ isActive }) =>
          `${base} ${isActive ? active : "text-gray-300"}`
        }>
          <BookOpen size={22} />
        </NavLink>

        <NavLink to="/profile" className={({ isActive }) =>
          `${base} ${isActive ? active : "text-gray-300"}`
        }>
          <User size={22} />
        </NavLink>

        <NavLink to="/settings" className={({ isActive }) =>
          `${base} ${isActive ? active : "text-gray-300"}`
        }>
          <Settings size={22} />
        </NavLink>
      </div>
    </>
  );
};

export default Sidebar;