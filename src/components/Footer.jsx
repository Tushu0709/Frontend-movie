import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 px-6 md:px-16 lg:px-36 w-full mt-20 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 lg:gap-20 mb-10">
        
        { }
        <div className="flex-1 md:max-w-sm">
          <Link to="/" className="inline-block mb-6">
            <img src={assets.logo} alt="Movie Ticket Logo" className="w-40 h-auto" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-400 mb-6">
            Your ultimate destination for booking movie tickets effortlessly. 
            Experience the magic of cinema with seamless booking and exclusive offers.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 group">
                <Twitter size={20} className="group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        { }
        <div className="flex-1 flex flex-col md:flex-row gap-10 md:gap-20">
            <div>
                <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                    Explore
                    <span className="absolute left-0 bottom-[-5px] w-1/2 h-0.5 bg-red-600 rounded-full"></span>
                </h3>
                <ul className="space-y-3 text-sm">
                    <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
                    <li><Link to="/movies" className="hover:text-red-500 transition-colors">Movies</Link></li>
                    <li><Link to="#" className="hover:text-red-500 transition-colors">Theaters</Link></li>
                    <li><Link to="#" className="hover:text-red-500 transition-colors">Events</Link></li>
                </ul>
            </div>

            <div>
                <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
                    Company
                    <span className="absolute left-0 bottom-[-5px] w-1/2 h-0.5 bg-red-600 rounded-full"></span>
                </h3>
                <ul className="space-y-3 text-sm">
                    <li><Link to="#" className="hover:text-red-500 transition-colors">About Us</Link></li>
                    <li><Link to="#" className="hover:text-red-500 transition-colors">Contact</Link></li>
                    <li><Link to="#" className="hover:text-red-500 transition-colors">Privacy Policy</Link></li>
                    <li><Link to="#" className="hover:text-red-500 transition-colors">Terms of Service</Link></li>
                </ul>
            </div>
        </div>

        { }
        <div className="flex-1 md:max-w-xs">
            <h3 className="text-white font-semibold text-lg mb-6">Subscribe</h3>
            <p className="text-sm text-gray-400 mb-4">
                Get the latest updates and offers directly in your inbox.
            </p>
            <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden border border-gray-700 focus-within:border-red-500 transition-colors">
                <div className="pl-3 text-gray-400">
                    <Mail size={18} />
                </div>
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full bg-transparent p-3 text-sm text-white focus:outline-none"
                />
                <button className="bg-red-600 hover:bg-red-700 text-white p-3 transition-colors">
                    <Send size={18} />
                </button>
            </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
        <p>Copyright © {new Date().getFullYear()} Movie Ticket. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
