import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { AuthContext } from "../../context/AuthContext";

const AdminNavbar = () => {
  const { logoutAdmin } = useContext(AuthContext);

  return (
    <div className="flex items-center justify-between px-6 md:px-10 h-16 border-b border-gray-300/30">
      <Link to="/">
        <img src={assets.logo} alt="logo" className="h-auto w-36"/>
      </Link>
      <button 
        onClick={logoutAdmin}
        className="bg-primary text-white px-5 py-2 rounded-full font-light text-xs sm:text-sm hover:bg-primary-dull transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminNavbar;
