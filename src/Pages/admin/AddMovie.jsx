import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Film, Star, Clock, Calendar, Image as ImageIcon, AlignLeft, Loader2 } from 'lucide-react';

const AddMovie = () => {
    const [formData, setFormData] = useState({
        title: '',
        rating: 0,
        duration: '',
        releaseDate: '',
        poster: '',
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    // Helper to get token
    const getToken = () => localStorage.getItem('adminToken');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const token = getToken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/movie`, formData, config);
            
            if (data.success) {
                toast.success('Movie Added Successfully');
                setFormData({
                    title: '',
                    rating: 0,
                    duration: '',
                    releaseDate: '',
                    poster: '',
                    description: ''
                });
            } else {
                toast.error(data.message || 'Failed to add movie');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-[#1F2937] text-white  animate-fade-in w-full">
            <h2 className="text-3xl font-bold mb-8 text-red-500 text-center flex items-center justify-center gap-2">
                <Film className="w-8 h-8" />
                Add New Movie
            </h2>
            <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column: Inputs */}
                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2" htmlFor="title">
                                        <Film className="w-4 h-4 text-red-500" />
                                        Movie Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                        placeholder="Enter movie title"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Rating */}
                                    <div>
                                        <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2" htmlFor="rating">
                                            <Star className="w-4 h-4 text-yellow-500" />
                                            Rating
                                        </label>
                                         <input
                                            type="number"
                                            id="rating"
                                            name="rating"
                                            value={formData.rating}
                                            onChange={handleChange}
                                            min="0"
                                            max="10"
                                            step="0.1"
                                            className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            required
                                        />
                                    </div>

                                     {/* Duration */}
                                    <div>
                                         <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2" htmlFor="duration">
                                            <Clock className="w-4 h-4 text-blue-500" />
                                            Duration (min)
                                        </label>
                                         <input
                                            type="number"
                                            id="duration"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                            placeholder="e.g. 120"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Release Date */}
                                 <div>
                                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2" htmlFor="releaseDate">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                        Release Date
                                    </label>
                                    <input
                                        type="date"
                                        id="releaseDate"
                                        name="releaseDate"
                                        value={formData.releaseDate}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all text-gray-300"
                                        required
                                    />
                                </div>

                                {/* Poster URL */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2" htmlFor="poster">
                                        <ImageIcon className="w-4 h-4 text-purple-500" />
                                        Poster URL
                                    </label>
                                    <input
                                        type="text"
                                        id="poster"
                                        name="poster"
                                        value={formData.poster}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500"
                                        placeholder="https://image.tmdb.org/t/p/..."
                                        required
                                    />
                                </div>
                            </div>

                            {/* Right Column: Description & Preview */}
                            <div className="space-y-6 flex flex-col">
                                {/* Description */}
                                <div>
                                    <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-2" htmlFor="description">
                                        <AlignLeft className="w-4 h-4 text-orange-500" />
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-gray-700/50 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder-gray-500 h-32 resize-none"
                                        placeholder="Enter movie description..."
                                        required
                                    />
                                </div>

                                {/* Live Preview */}
                                <div className="flex-1 bg-gray-700/30 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center relative overflow-hidden group">
                                    {formData.poster ? (
                                        <img 
                                            src={formData.poster} 
                                            alt="Preview" 
                                            className="absolute inset-0 w-full h-full object-contain p-2 rounded-lg transition-transform duration-300 group-hover:scale-105"
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = 'https://via.placeholder.com/300x450?text=Invalid+Image+URL'
                                            }}
                                        />
                                    ) : (
                                        <div className="text-center text-gray-500 p-4">
                                            <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">Poster preview will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-red-900/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Adding Movie...
                                    </>
                                ) : (
                                    <>
                                        <Film className="w-5 h-5" />
                                        Add Movie
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;
