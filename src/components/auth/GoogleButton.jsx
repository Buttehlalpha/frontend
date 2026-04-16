import { GoogleLogin } from "@react-oauth/google";

const GoogleButton = () => {
  return (
    <GoogleLogin
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="w-full flex items-center justify-center gap-3 border border-gray-400 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          <img src={googleIcon} alt="google" className="w-5 h-5" />
          Continue with Google
        </button>
      )}
    />
  );
};

export default GoogleButton;