import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);

      console.log("Google User:", decoded);

      const res = await axios.post("http://localhost:5000/api/auth/google", {
        name: decoded.name,
        email: decoded.email,
        googleId: decoded.sub,
      });

      localStorage.setItem("token", res.data.token);

      navigate("/course-selection"); // 👉 NEXT STEP
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleAuth;