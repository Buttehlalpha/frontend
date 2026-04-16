import { useEffect, useState } from "react";
import axios from "axios";

const VisionBoardView = () => {
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/vision/${userId}`
      );
      setData(res.data);
    };

    fetchBoard();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">

      {/* IMAGES */}
      {data.images.map((img, i) => (
        <img
          key={i}
          src={`http://localhost:5000/${img}`}
          className="rounded-xl object-cover w-full h-40"
        />
      ))}

      {/* TEXTS */}
      {data.texts.map((t, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow text-center"
        >
          {t}
        </div>
      ))}

    </div>
  );
};

export default VisionBoardView;