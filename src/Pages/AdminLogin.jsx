import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loginAdmin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        formData
      );
      if (data.success) {
        if (data.user.role !== "admin") {
          toast.error("Access Denied: Admins Only");
          return;
        }
        loginAdmin(data.token, data.user, "/admin");
        toast.success("Admin Login Successful");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-[#09090B]">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Admin Portal</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300 ml-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              autoFocus
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border border-gray-500/50 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-300 ml-1">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent border border-gray-500/50 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-primary hover:bg-primary-dull text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
          >
            Access Dashboard
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2">
          <Link
            to="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
