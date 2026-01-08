import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ListMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  
  const getToken = () => localStorage.getItem('adminToken');

  const fetchMovies = async () => {
    try {
      
      
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie?limit=100`); 
      if (data.movies) {
        setMovies(data.movies);
      } else {
        toast.error("Failed to load movies");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch movies");
    }
  };

  const deleteMovie = async (id) => {
      if(!window.confirm("Are you sure you want to delete this movie?")) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${getToken()}` }
      };
      
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/movie/${id}`, 
        config
      );
      
      if (data.success) {
        toast.success(data.message);
        fetchMovies(); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete movie");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);



  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h2 className="text-3xl font-bold mb-6 text-red-500">Movie Management</h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="p-4 border-b border-gray-600">Poster</th>
              <th className="p-4 border-b border-gray-600">Title</th>
               <th className="p-4 border-b border-gray-600">Release Date</th>
              <th className="p-4 border-b border-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id} className="hover:bg-gray-750 transition border-b border-gray-700">
                <td className="p-4">
                  <img
                    
                    src={movie.poster.startsWith('http') ? movie.poster : `https://image.tmdb.org/t/p/w200${movie.poster}`}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-4 font-medium">{movie.title}</td>
                <td className="p-4 text-gray-400">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => navigate(`/admin/edit-movie/${movie._id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteMovie(movie._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {movies.length === 0 && (
                <tr>
                    <td colSpan="4" className="p-4 text-center text-gray-500">No movies found.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListMovies;
