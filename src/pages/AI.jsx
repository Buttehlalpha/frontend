import Sidebar from "../components/dashboard/Sidebar";
import GapGrid from "../components/ai/GapGrid";

const AI = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      <div className="flex-1 p-6 space-y-6">
        
        <div>
          <h2 className="text-2xl font-semibold">Gap Detection</h2>
          <p className="text-gray-500">
            AI-powered insights into your learning weaknesses.
          </p>
        </div>

        <GapGrid />

      </div>
    </div>
  );
};

export default AI;