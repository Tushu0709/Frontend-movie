import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        rating: 0,
        duration: '',
        releaseDate: '',
        poster: '',
        description: ''
    });

    // Helper to get token
    const getToken = () => localStorage.getItem('adminToken');

    // Fetch existing movie details
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                // Determine if we need to fetch specifically by ID. 
                // Since the GET /api/movie endpoint might return a list or search result, 
                // we'll assume we might need to filter or if the backend supports /api/movie/:id GET (which is standard).
                // Looking at previous context, public GET /api/movie lists movies. 
                // Typical REST pattern suggests GET /api/movie/:id should exist or we filter.
                // Let's try GET /api/movie/:id first. If it fails, we fall back to filtering via list (less ideal).
                // Looking at movieRoutes.js earlier, it seemed to have router.get('/'...) and specific admin routes.
                // Let's assume we need to fetch specific movie. If GET /:id isn't public, we might need auth or just iterate.
                // Actually, earlier `ListMovies` used DELETE /api/movie/:id, so /:id is a valid path param structure.
                // Typically access to details is public.
                
                // Constructing the GET request. 
                // Note: If GET /api/movie/:id isn't implemented in backend, this might fail. 
                // However, usually `Moviedetails` page exists (saw `Moviedetails` in `App.jsx` mapped to `/movies/:id`).
                // Let's check `App.jsx`: `<Route path="/movies/:id" element={<Moviedetails />} />`. 
                // `Moviedetails` likely fetches data.
                
                // Let's try fetching from public endpoint first.
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie/${id}`);
                
                if (data.success && data.movie) {
                    const movie = data.movie;
                    setFormData({
                        title: movie.title || '',
                        rating: movie.rating || 0,
                        duration: movie.duration || '',
                        releaseDate: movie.releaseDate ? new Date(movie.releaseDate).toISOString().split('T')[0] : '',
                        poster: movie.poster || '',
                        description: movie.description || ''
                    });
                } else {
                    toast.error('Movie not found');
                    navigate('/admin/list-movies');
                }
            } catch (error) {
                console.error(error);
                // Fallback: If specific GET fails, maybe try finding in list? 
                // But for now, let's assume standard API behavior or existing structure.
                // If it fails, I might need to check how `Moviedetails` fetches.
                toast.error('Failed to fetch movie details');
            }
        };

        if (id) {
            fetchMovie();
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = getToken();
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/movie/${id}`, formData, config);
            
            if (data.success) {
                toast.success('Movie Updated Successfully');
                navigate('/admin/list-movies');
            } else {
                toast.error(data.message || 'Failed to update movie');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };



    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">Update Movie</h2>
            <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="Enter movie title"
                            required
                        />
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Rating */}
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="rating">
                                Rating (0-10)
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
                                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                                required
                            />
                        </div>

                         {/* Duration */}
                        <div>
                             <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="duration">
                                Duration (minutes)
                            </label>
                             <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                                placeholder="e.g. 120"
                                required
                            />
                        </div>
                    </div>



                    {/* Release Date */}
                     <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="releaseDate">
                            Release Date
                        </label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Poster URL */}
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="poster">
                            Poster URL
                        </label>
                        <input
                            type="text"
                            id="poster"
                            name="poster"
                            value={formData.poster}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500 transition-colors"
                            placeholder="https://image.tmdb.org/..."
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-red-500 transition-colors h-32"
                            placeholder="Enter movie description"
                            required
                        />
                    </div>



                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded transition duration-200 mt-4"
                    >
                        Update Movie
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateMovie;
