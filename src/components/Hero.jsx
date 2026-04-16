import bgImage from "../assets/library.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative w-full min-h-screen">
      
      {/* Background Image */}
      <img
        src={bgImage}
        alt="Library"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-3xl text-center">
          
          {/* Heading */}
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-6xl leading-tight">
            Learn smarter with <br className="hidden sm:block" />
            personalized guidance.
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 mt-4 sm:mt-6 text-base sm:text-lg md:text-xl">
            Your personal AI tutor that identifies learning gaps, recommends
            study plans, and helps you achieve your academic goals.
          </p>

          {/* Button */}
          <Link
            to="/signup"
            className="mt-6 sm:mt-8 inline-flex justify-center items-center gap-2 
                       bg-purple-600 hover:bg-purple-700 text-white 
                       px-6 py-3 rounded-lg text-base sm:text-lg 
                       w-full sm:w-auto transition transform hover:scale-105"
          >
            Start Learning Now
            <span>›</span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Hero;