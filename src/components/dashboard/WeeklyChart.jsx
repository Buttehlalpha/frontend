const WeeklyChart = () => {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <h3 className="font-semibold mb-4">Weekly Progress</h3>

      <div className="flex items-end gap-3 h-40">
        {[20, 40, 70, 10, 60, 30, 5].map((h, i) => (
          <div key={i} className="flex-1 bg-gray-200 rounded">
            <div
              className="bg-purple-700 rounded"
              style={{ height: `${h}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChart;