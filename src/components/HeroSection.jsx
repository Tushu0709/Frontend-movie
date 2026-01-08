import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import hero1 from '../assets/hero_gen_1.png';
import hero2 from '../assets/hero_gen_2.png';
import hero3 from '../assets/hero_gen_3.png';
import gsap from 'gsap';

const HeroSection = () => {
    const navigate = useNavigate();
    const images = [hero1, hero2, hero3];
    const [currentIndex, setCurrentIndex] = useState(0);
    
    
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const buttonRef = useRef(null);

    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000); 
        return () => clearInterval(interval);
    }, [images.length]);

    
    useEffect(() => {
        const tl = gsap.timeline();
        
        tl.fromTo(titleRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(subtitleRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.5"
        )
        .fromTo(buttonRef.current,
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            "-=0.3"
        );
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };
    
    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className='w-full h-[500px] sm:h-[600px] lg:h-[700px] relative overflow-hidden group mt-16'>
            { }
             {images.map((img, index) => (
                <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img 
                        src={img} 
                        alt={`Hero Slide ${index + 1}`} 
                        className='w-full h-full object-cover'
                    />
                     { }
                    <div className='absolute inset-0 bg-gradient-to-t from-[#09090B] via-black/40 to-black/30'></div>
                </div>
            ))}

            { }
            <div className='absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-4'>
                <h1 
                    ref={titleRef}
                    className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-xl tracking-wide max-w-4xl'
                >
                    Experience the Magic of <span className='text-primary'>Cinema</span>
                </h1>
                <p 
                    ref={subtitleRef}
                    className='text-gray-200 text-lg md:text-xl max-w-2xl mb-8 font-medium drop-shadow-lg'
                >
                    Book tickets for the latest releases from the comfort of your home.
                </p>
                <button 
                    ref={buttonRef}
                    onClick={() => navigate('/movies')}
                    className='px-10 py-3 bg-primary hover:bg-[#e03131] text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl border border-transparent hover:border-white/20'
                >
                    Explore Movies
                </button>
            </div>

            { }
            <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20'>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-300 rounded-full cursor-pointer shadow-sm ${index === currentIndex ? 'bg-primary w-8 h-3' : 'bg-white/50 hover:bg-white w-3 h-3'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
            
             { }
            <button 
                onClick={prevSlide}
                className='absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm hover:scale-110 z-20 hidden md:block'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            
            { }
             <button 
                onClick={nextSlide}
                className='absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm hover:scale-110 z-20 hidden md:block'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
    );
};

export default HeroSection;
