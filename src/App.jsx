import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AI from "./pages/AI";
import Settings from "./components/dashboard/Settings";

import CourseSelection from "./pages/CourseSelection";
import SelectYear from "./pages/SelectYear";
import ModuleCourse from "./pages/ModuleCourse";

import FocusSession from "./pages/FocusSession";
import FocusMode from "./pages/FocusMode";
import Modules from "./pages/Modules";
// ✅ RESTORED ROUTES
import Planner from "./pages/Planner";
import Profile from "./pages/Profile";
import GroupChat from "./pages/GroupChat";
import VisionBoard from "./pages/VisionBoard";




function App() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* MAIN APP */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/ai" element={<AI />} />

      {/* RESTORED ROUTES */}
      <Route path="/schedule" element={<Planner />} />
      <Route path="/profile" element={<Profile />} />

      {/* ONBOARDING FLOW */}
      <Route path="/course-selection" element={<CourseSelection />} />
      <Route path="/year" element={<SelectYear />} />
      <Route path="/modules-course" element={<ModuleCourse />} />
      <Route path="/modules" element={<Modules />} />
      {/* FOCUS FLOW */}
      <Route path="/focus-mode" element={<FocusMode />} />
      <Route path="/focus-session" element={<FocusSession />} />
      <Route path="/group/:id" element={<GroupChat />} />
      <Route path="/visionBoard" element={<VisionBoard />} />

    </Routes>
  );
}

export default App;