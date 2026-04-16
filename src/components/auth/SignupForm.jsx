import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { registerUser } from "../../api";
import GoogleAuth from "../auth/GoogleAuth";

const SignupForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    school: "",
    level: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.name ||
        !form.email ||
        !form.password ||
        !form.school ||
        !form.level
      ) {
        return alert("Please fill all fields ⚠️");
      }

      if (form.password !== form.confirmPassword) {
        return alert("Passwords do not match ❌");
      }

      const res = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        school: form.school,
        level: form.level,
      });

      localStorage.setItem("token", res.data.token);

      alert("Signup successful ✅");

      navigate("/course-selection");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 space-y-4">

      <h2 className="text-3xl font-bold text-center">Sign up</h2>
      <p className="text-gray-500 text-center">Create your account</p>

      <Input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />
      <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
      <Input name="school" placeholder="School Name" value={form.school} onChange={handleChange} />
      <Input name="level" placeholder="Level" value={form.level} onChange={handleChange} />
      <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
      <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />

      <Button onClick={handleSubmit}>
        Get Started
      </Button>

      <div className="flex items-center gap-2 my-4">
        <hr className="flex-1" />
        <span className="text-gray-400 text-sm">OR</span>
        <hr className="flex-1" />
      </div>

      <GoogleAuth />

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-600 font-medium hover:underline">
          Login
        </Link>
      </p>

    </div>
  );
};

export default SignupForm;