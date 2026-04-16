const GoalItem = () => {
  return (
    <div className="bg-white p-5 rounded-xl flex items-center justify-between shadow">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-purple-100 text-purple-700 w-10 h-10 flex items-center justify-center rounded-lg">
          B
        </div>

        <div>
          <h4 className="font-medium">Complete Biology Unit 1</h4>
          <p className="text-sm text-gray-500">DUE 12/02/2023</p>
        </div>
      </div>

      {/* Middle */}
      <div className="w-1/3">
        <p className="text-sm">Progress</p>

        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div className="bg-purple-600 h-2 rounded-full w-[52%]"></div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-purple-600">52%</span>
        <button className="text-red-500">🗑</button>
      </div>

    </div>
  );
};

export default GoalItem;