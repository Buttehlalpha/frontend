import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Users, Plus } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [groups, setGroups] = useState([]);
  const [joinCode, setJoinCode] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ LOAD GROUPS
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/groups/${user?._id}`
        );
        setGroups(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchGroups();
  }, [user]);

  // ✅ CREATE GROUP
  const handleCreateGroup = async () => {
    const name = prompt("Enter group name");
    if (!name) return;

    try {
      const res = await axios.post("http://localhost:5000/api/groups/create", {
        name,
        userId: user._id,
      });

      alert(`Group created! Code: ${res.data.code}`);
      setGroups([...groups, res.data]);
    } catch (err) {
      console.log(err);
      alert("Error creating group");
    }
  };

  // ✅ JOIN GROUP
  const handleJoinGroup = async () => {
    if (!joinCode) return alert("Enter group code");

    try {
      const res = await axios.post("http://localhost:5000/api/groups/join", {
        code: joinCode,
        userId: user._id,
      });

      alert("Joined group!");
      setGroups([...groups, res.data]);
      setJoinCode("");
    } catch (err) {
      console.log(err);
      alert("Invalid code");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 ml-0 md:ml-20 p-4 md:p-8">

        {/* TOP */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Collaborative Circles
          </h1>

          <button
            onClick={handleCreateGroup}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={16} />
            New Group
          </button>
        </div>

        {/* JOIN */}
        <div className="flex mb-6">
          <input
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter group code..."
            className="px-4 py-2 bg-gray-200 rounded-l-lg outline-none w-60"
          />
          <button
            onClick={handleJoinGroup}
            className="bg-purple-600 text-white px-4 rounded-r-lg"
          >
            Join
          </button>
        </div>

        {/* GROUP LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-3 rounded-xl">
                  <Users size={18} className="text-purple-600" />
                </div>
              </div>

              <h2 className="font-semibold text-lg mb-2">
                {group.name}
              </h2>

              <p className="text-sm text-gray-500 mb-4">
                Code: {group.code}
              </p>

              <button
                onClick={() =>
                  navigate(`/group/${group._id}`, {
                    state: { group },
                  })
                }
                className="w-full border rounded-xl py-2 text-purple-600 font-medium hover:bg-purple-50"
              >
                Open Chat
              </button>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Profile;