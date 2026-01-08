import React, { useEffect, useState, useRef } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import MovieDetailModal from "../components/MovieDetailModal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("date"); 
    const [isTopRated, setIsTopRated] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef(null);

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const fetchMovies = async () => {
        try {
            setLoading(true);
            let url = `${import.meta.env.VITE_API_URL}/api/movie`;
            let params = { q: search, sort, limit: 1000 };

            if (isTopRated) {
                params.sort = "rating";
            }

            const { data } = await axios.get(url, { params });
            if (data.success || data.movies) {
                setMovies(data.movies);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
             
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMovies();
    }, [isTopRated, sort, search]); 

    
    useEffect(() => {
        if (loading || movies.length === 0) return;

        
        const ctx = gsap.context(() => {
            ScrollTrigger.batch(".movie-card-item", {
                onEnter: (batch) => {
                    gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        overwrite: true
                    });
                },
                onEnterBack: (batch) => {
                     gsap.to(batch, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        overwrite: true
                    });
                },
                onLeave: (batch) => {
                    
                    gsap.to(batch, { opacity: 0, y: -50, duration: 0.6, overwrite: true });
                },
                onLeaveBack: (batch) => {
                     
                     gsap.to(batch, { opacity: 0, y: 50, duration: 0.6, overwrite: true });
                },
                start: "top 90%",
                end: "bottom 20%"
                
            });
        }, containerRef);

        return () => ctx.revert();
    }, [movies, loading]);

  return (
    <div className="min-h-screen bg-[#09090B] pb-20 pt-28 px-4 md:px-12 lg:px-24" ref={containerRef}>
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10 gap-6">
                 <div>
                    <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
                        {isTopRated ? "Top Rated" : "Discover Movies"}
                    </h1>
                     <p className="text-gray-400 text-sm">Explore the latest and greatest from the world of cinema.</p>
                 </div>
                 
                 <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                     { }
                    <button 
                        onClick={() => { setIsTopRated(!isTopRated); setSearch(""); }}
                        className={`hidden md:block px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 border ${isTopRated ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30' : 'bg-transparent border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'}`}
                    >
                        {isTopRated ? "Show All Movies" : "Top Rated"}
                    </button>

                     {!isTopRated && (
                         <div className="flex flex-1 md:flex-none gap-3 w-full md:w-auto">
                            { }
                            <div className="relative flex-grow md:flex-grow-0 group">
                                <span className="absolute left-3 top-3 text-gray-500 group-focus-within:text-white transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                <input 
                                    type="text" 
                                    placeholder="Search by title or description..." 
                                    className="pl-10 pr-4 py-2.5 w-full md:w-64 bg-[#1E1E1E] border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-sm"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                             { }
                             <div className="relative">
                                <select 
                                    className="appearance-none pl-4 pr-10 py-2.5 bg-[#1E1E1E] border border-gray-800 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer transition-all text-sm w-full md:w-auto"
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                >
                                    <option value="date">Latest</option>
                                    <option value="name">A-Z</option>
                                    <option value="rating">Rating</option>
                                    <option value="duration">Duration</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                             </div>
                         </div>
                     )}
                 </div>
            </div>

       {loading ? (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
        ) : movies.length > 0 ? (
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
           {movies.map((movie) => (
             <div key={movie._id} className="movie-card-item opacity-0 translate-y-12">
                 <MovieCard 
                    movie={movie} 
                    onClick={() => handleMovieClick(movie)}
                 />
             </div>
           ))}
         </div>
       ) : (
         <div className="flex flex-col items-center justify-center h-96 text-gray-500 bg-[#1E1E1E] rounded-2xl border border-dashed border-gray-800">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <p className="text-xl font-medium text-gray-400">No movies found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
         </div>
       )}

        </div>

        <MovieDetailModal 
            movie={selectedMovie} 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
    </div>
  );
};

export default Movies;
