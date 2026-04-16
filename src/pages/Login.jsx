import LoginForm from "../components/auth/LoginForm";
import bgImage from "../assets/library.png";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 md:bg-white md:grid md:grid-cols-2">
      
      {/* MOBILE TOP IMAGE */}
      <div className="md:hidden relative h-56">
        <img
          src={bgImage}
          alt="Library"
          className="w-full h-full object-cover rounded-b-3xl"
        />
        <div className="absolute inset-0 bg-black/40 rounded-b-3xl"></div>
      </div>

      {/* FORM SECTION */}
      <div className="flex items-center justify-center px-6 py-10">
        <LoginForm />
      </div>

      {/* DESKTOP IMAGE (same as signup) */}
      <div className="hidden md:block relative">
        <img
          src={bgImage}
          alt="Library"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
    </div>
  );
};

export default Login;