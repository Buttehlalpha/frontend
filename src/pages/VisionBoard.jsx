import { useEffect, useState } from "react";
import axios from "axios";

const VisionBoard = () => {
  const [images, setImages] = useState([]);
  const [texts, setTexts] = useState([""]);
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  // ================= FETCH =================
  const fetchBoard = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vision/${userId}`
      );
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBoard();
  }, []);

  // ================= IMAGE =================
  const handleImage = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  // ================= TEXT =================
  const handleTextChange = (i, value) => {
    const updated = [...texts];
    updated[i] = value;
    setTexts(updated);
  };

  const addTextField = () => {
    setTexts([...texts, ""]);
  };

  // ================= SAVE =================
  const handleSave = async () => {
    const formData = new FormData();

    images.forEach((img) => {
      formData.append("images", img);
    });

    formData.append("texts", JSON.stringify(texts));
    formData.append("userId", userId);

    try {
      await axios.post(
        "http://localhost:5000/api/vision/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Saved!");

      // RESET
      setImages([]);
      setTexts([""]);

      fetchBoard();
    } catch (err) {
      console.log(err);
      alert("❌ Error saving");
    }
  };

  return (
    <div className="p-6 space-y-10">

      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-2xl shadow">

        <h1 className="text-2xl font-bold mb-4">
          Create Vision Board
        </h1>

        {/* UPLOAD */}
        <input
          type="file"
          multiple
          onChange={handleImage}
          className="mb-4"
        />

        {/* PREVIEW */}
        <div className="flex gap-3 flex-wrap mb-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={URL.createObjectURL(img)}
              className="w-20 h-20 object-cover rounded-lg"
            />
          ))}
        </div>

        {/* TEXT */}
        {texts.map((t, i) => (
          <input
            key={i}
            value={t}
            onChange={(e) =>
              handleTextChange(i, e.target.value)
            }
            placeholder="Enter your vision..."
            className="block w-full border p-2 mb-3 rounded"
          />
        ))}

        <button
          onClick={addTextField}
          className="text-purple-600 mb-6"
        >
          + Add Text
        </button>

        <button
          onClick={handleSave}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          Save Vision Board
        </button>
      </div>

      {/* ================= DISPLAY ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Your Vision Board
        </h2>

        {!data ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {Array.from({
              length: Math.max(
                data.images?.length || 0,
                data.texts?.length || 0
              ),
            }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow overflow-hidden"
              >
                {/* IMAGE */}
                {data.images?.[i] && (
                  <img
                    src={`http://localhost:5000/${data.images[i]}`}
                    className="w-full h-40 object-cover"
                  />
                )}

                {/* TEXT */}
                {data.texts?.[i] && (
                  <div className="p-3 text-center text-sm">
                    {data.texts[i]}
                  </div>
                )}
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
};

export default VisionBoard;