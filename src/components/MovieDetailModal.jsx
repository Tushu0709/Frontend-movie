import React from "react";
import { X, Star, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MovieDetailModal = ({ movie, isOpen, onClose }) => {
  if (!isOpen || !movie) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#18181B] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 max-h-[90vh] overflow-y-auto"
        >
          { }
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col md:flex-row">
            { }
            <div className="w-full md:w-2/5 h-64 md:h-auto relative">
              <img
                src={movie.poster || movie.backdrop || "https://via.placeholder.com/500x750?text=No+Image"}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#18181B] opacity-90"></div>
            </div>

            { }
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col gap-4">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{movie.title}</h2>
                {movie.description && (
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-4">
                    {movie.description}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                  {movie.releaseDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(movie.releaseDate).getFullYear()}</span>
                    </div>
                  )}
                  {movie.duration && (
                     <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{movie.duration} min</span>
                    </div>
                  )}
                  {movie.language && (
                    <div className="px-2 py-0.5 rounded border border-gray-700 text-xs uppercase">
                        {movie.language}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                 <div className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-lg">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold">{movie.rating?.toFixed(1) || "N/A"}</span>
                 </div>
                 <span className="text-gray-500 text-sm">User Rating</span>
              </div>

              {movie.genre && (
                  <div className="flex flex-wrap gap-2 mb-2">
                      { }
                      {Array.isArray(movie.genre) 
                        ? movie.genre.map((g, i) => <span key={i} className="text-xs font-medium text-gray-300 bg-gray-800 px-2.5 py-1 rounded-full">{typeof g === 'object' ? g.name : g}</span>)
                        : <span className="text-xs font-medium text-gray-300 bg-gray-800 px-2.5 py-1 rounded-full">{movie.genre}</span>
                      }
                  </div>
              )}

             

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MovieDetailModal;
