import React, { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loginUser } = useContext(AuthContext);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
            if (data.success) {
                loginUser(data.token, data.user);
                toast.success('Login Successful');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login Failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen w-full bg-[#09090B]">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center">
                <h2 className="text-3xl font-bold mb-6 text-white">Sign In</h2>
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-300 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            autoFocus
                            placeholder="Enter your email"
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
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            className="bg-transparent border border-gray-500/50 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-4 bg-primary hover:bg-primary-dull text-white font-semibold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform active:scale-95"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
