import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import ModuleCard from "../components/modules/ModuleCard";

const Modules = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 md:ml-20 pb-20 md:pb-6">
        <Topbar />

        <div className="p-4 md:p-6 space-y-6">
          
          <h2 className="text-2xl md:text-3xl font-semibold">
            Modules & Assignments
          </h2>

          <ModuleCard
            title="Financial Accounting Fundamentals"
            assignments={1}
            open={true}
          />

          <ModuleCard title="Business Economics" assignments={0} />
          <ModuleCard title="Quantitative Methods" assignments={0} />
          <ModuleCard title="Introduction to Management" assignments={0} />

        </div>
      </div>
    </div>
  );
};

export default Modules;