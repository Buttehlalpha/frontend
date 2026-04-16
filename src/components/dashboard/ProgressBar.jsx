const ProgressBar = ({ value }) => {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
      <div
        className="bg-purple-400 h-2 rounded-full"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;