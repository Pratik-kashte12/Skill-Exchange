import { useEffect, useState } from "react";
import api from "../api";

function Home() {
  const [skills, setSkills] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUserToken = localStorage.getItem("token");

  const fetchSkills = async (query = "") => {
    setLoading(true);
    try {
      const res = await api.get(`/skills${query ? `?search=${query}` : ""}`);
      setSkills(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSkills(search);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/skills/${id}`);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      alert(err.response?.data?.message || "Could not delete");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Discover Skills</h1>
      <p className="text-gray-500 mb-6">Learn something new, teach what you know — no money involved.</p>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Search skills (e.g. Guitar, Python...)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border p-2 rounded-md outline-indigo-500"
        />
        <button className="bg-indigo-600 text-white px-5 rounded-md">Search</button>
      </form>

      {loading ? (
        <p>Loading skills...</p>
      ) : skills.length === 0 ? (
        <p className="text-gray-500">No skills found. Be the first to add one!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill._id} className="bg-white border rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">{skill.title}</h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                  {skill.category}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-2">{skill.description}</p>
              <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                <span>Offered by {skill.ownerName}</span>
                {currentUserToken && (
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
