import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AddSkill() {
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/skills", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login required to add a skill");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Offer a Skill</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text" name="title" placeholder="Skill Title (e.g. Guitar Basics)" value={form.title}
          onChange={handleChange} required
          className="w-full border p-2 rounded-md mb-4 outline-indigo-500"
        />
        <input
          type="text" name="category" placeholder="Category (e.g. Music, Coding, Cooking)" value={form.category}
          onChange={handleChange} required
          className="w-full border p-2 rounded-md mb-4 outline-indigo-500"
        />
        <textarea
          name="description" placeholder="Describe what you can teach..." value={form.description}
          onChange={handleChange} required rows={4}
          className="w-full border p-2 rounded-md mb-4 outline-indigo-500"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium">
          Post Skill
        </button>
      </form>
    </div>
  );
}

export default AddSkill;
