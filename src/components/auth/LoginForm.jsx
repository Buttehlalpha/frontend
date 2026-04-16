import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import GoogleButton from "./GoogleButton";
import { loginUser } from "../../api";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Handle login
  const handleSubmit = async () => {
    try {
      console.log("LOGIN DATA:", form);

      const res = await loginUser(form);

      const { token, user } = res.data;

      // 💾 Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);
      localStorage.setItem("user", JSON.stringify(user));

      //  SUCCESS TOAST
      toast.success("Login successful 🚀");

      // 👉 NEXT FLOW
      navigate("/course-selection");

    } catch (err) {
      console.log("LOGIN ERROR:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong";

      // ❌ ERROR TOAST
      toast.error(errorMessage);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6">

      {/* TITLE */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Sign in
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* GOOGLE LOGIN */}
      <GoogleButton />

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-[1px] bg-gray-300" />
        <span className="text-sm text-gray-500">Or with email</span>
        <div className="flex-1 h-[1px] bg-gray-300" />
      </div>

      {/* INPUTS */}
      <div className="space-y-4">
        <Input
          type="email"
          name="email"
          placeholder="Email@gmail.com"
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </div>

      {/* BUTTON */}
      <Button onClick={handleSubmit}>
        Get Started
      </Button>

      {/* SIGNUP LINK */}
      <p className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-purple-600 font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;