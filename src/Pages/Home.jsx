import React, { useEffect, useState, useRef } from 'react'
import HeroSection from '../components/HeroSection'
import MovieCard from '../components/MovieCard'
import MovieDetailModal from '../components/MovieDetailModal'
import axios from 'axios'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/movie`);
      if (data.success || data.movies) {
        setMovies(data.movies || []);
      }
    } catch (error) {
      console.error("Failed to fetch movies", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMovies();
  }, []);

  
  useEffect(() => {
    if (movies.length > 0 && sectionRef.current) {
        const ctx = gsap.context(() => {
            gsap.fromTo(".header-animate", 
                { y: 50, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1, 
                    duration: 0.8, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: ".header-animate",
                        start: "top 80%",
                    }
                }
            );

            gsap.fromTo(".movie-card-animate",
                { y: 50, opacity: 0 },
                {
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6, 
                    stagger: 0.1, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);
        
        return () => ctx.revert();
    }
  }, [movies]);

  return (
    <>
      <HeroSection/>
      
      { }
      <div ref={sectionRef} className="py-20 px-4 md:px-12 lg:px-24 bg-[#09090B]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10 header-animate opacity-0">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Latest Movies</h2>
              <p className="text-gray-400">Watch the newest releases</p>
            </div>
            <a href="/movies" className="text-primary hover:text-primary-dull transition-colors font-medium">View All &rarr;</a>
          </div>

          {movies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {movies.slice(0, 8).map((movie, index) => (
                <div key={movie._id} className="movie-card-animate opacity-0">
                  <MovieCard 
                      movie={movie} 
                      onClick={() => handleMovieClick(movie)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No movies available.</p>
          )}
        </div>
      </div>
      
      <MovieDetailModal 
        movie={selectedMovie} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default Home
