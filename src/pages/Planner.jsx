import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import CalendarGrid from "../components/planner/CalendarGrid";

const Planner = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 md:ml-20 pb-20 md:pb-6">
        <Topbar />

        <div className="p-4 md:p-6 space-y-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            <h2 className="text-2xl md:text-3xl font-semibold">
              Planner
            </h2>

            <div className="flex items-center gap-3">
              
              <div className="flex items-center bg-gray-200 px-4 py-2 rounded-lg">
                <span className="mx-2">March 2026</span>
              </div>

              <div className="flex bg-gray-200 rounded-lg overflow-hidden">
                <button className="px-4 py-2 bg-white text-purple-700">
                  Week
                </button>
                <button className="px-4 py-2 text-gray-600">
                  Month
                </button>
              </div>

              <button className="bg-purple-700 text-white px-4 py-2 rounded-lg">
                + Event
              </button>
            </div>
          </div>

          <CalendarGrid />

        </div>
      </div>
    </div>
  );
};

export default Planner;