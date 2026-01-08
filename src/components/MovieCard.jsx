import { StarIcon } from "lucide-react";
import React, { useRef } from "react";
import gsap from "gsap";

import timeFormat from "../lib/timeformat";

const MovieCard = ({movie, onClick}) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 
    
    // Calculate percentage from center (-1 to 1)
    const xPct = (x / rect.width - 0.5) * 2;
    const yPct = (y / rect.height - 0.5) * 2;

    // Tilt range (degrees)
    const sensitivity = 15;

    gsap.to(card, {
      rotationX: -yPct * sensitivity, // Tilt up/down
      rotationY: xPct * sensitivity,  // Tilt left/right
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
      transformOrigin: "center"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power3.out", // Smooth return
      clearProps: "all" // Optional: clear inline styles if needed, but consistent return is better
    });
  };

  return (
    <>
      <div 
        ref={cardRef}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex flex-col h-full bg-[#1E1E1E] rounded-xl overflow-hidden group shadow-lg border border-gray-800 cursor-pointer"
        // Removed transition-transform duration-300 hover:scale-105 to avoid conflict with GSAP
      >
        <div className="relative w-full h-80 overflow-hidden">
            <img
            src={movie.poster || movie.backdrop || "https://via.placeholder.com/300x450?text=No+Image"}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-transparent opacity-80"></div>
        </div>

        <div className="p-4 flex flex-col justify-between flex-grow">
            <div>
                <h3 className="font-bold text-lg text-white mb-1 leading-tight line-clamp-2">{movie.title}</h3>
                {/* Genre removed */}
            </div>

            <div className="flex items-center justify-between mt-auto">
                 <div className="flex items-center gap-1 text-yellow-500">
                    <StarIcon className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-white">{movie.rating?.toFixed(1) || "N/A"}</span>
                 </div>
                 <span className="text-xs text-gray-500">{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "N/A"}</span>
            </div>
            

        </div>
      </div>
    </>
  );
};

export default MovieCard;
