import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userName", res.data.user.name);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="email" name="email" placeholder="Email" value={form.email}
          onChange={handleChange} required
          className="w-full border p-2 rounded-md mb-4 outline-indigo-500"
        />
        <input
          type="password" name="password" placeholder="Password" value={form.password}
          onChange={handleChange} required
          className="w-full border p-2 rounded-md mb-4 outline-indigo-500"
        />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium">
          Login
        </button>
        <p className="text-sm mt-4 text-center">
          Don't have an account? <Link to="/signup" className="text-indigo-600 font-medium">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
