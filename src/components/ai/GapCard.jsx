const GapCard = ({ title, image, observation, recommendation }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4 space-y-4">
        
        <h3 className="font-semibold">{title}</h3>

        {/* Observation */}
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-xs text-gray-500 uppercase">Observation</p>
          <p className="text-sm mt-1">{observation}</p>
        </div>

        {/* Recommendation */}
        <div>
          <p className="text-xs text-purple-600 font-semibold">
            🤖 AI Recommendation
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {recommendation}
          </p>
        </div>

        {/* Button */}
        <button className="w-full border border-purple-400 text-purple-600 py-2 rounded-lg hover:bg-purple-50 transition">
          Start Review Session →
        </button>

      </div>
    </div>
  );
};

export default GapCard;