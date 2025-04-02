import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBasket, FaUser } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-3xl font-extrabold tracking-tight transition-all duration-300 group-hover:scale-105">
              Groozo
            </span>
            <span className="text-xs bg-white text-green-600 px-3 py-1 rounded-full font-bold shadow-sm transform transition-all duration-300 group-hover:translate-y-0.5">
              🚀 Express Delivery
            </span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for groceries..."
                  className="w-72 px-5 py-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 transition-all duration-300 shadow-sm hover:shadow-md"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/auth" 
                className="flex items-center space-x-2 hover:bg-green-800 px-4 py-2.5 rounded-lg transition-all duration-300 group"
              >
                <FaUser className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="ml-1 hidden sm:inline font-medium">Login</span>
              </Link>
              <Link 
                to="/cart" 
                className="flex items-center space-x-2 hover:bg-green-800 px-4 py-2.5 rounded-lg transition-all duration-300 group relative"
              >
                <FaShoppingBasket className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="ml-1 hidden sm:inline font-medium">Cart</span>
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-green-900 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-md transform group-hover:scale-110 transition-transform">
                  0
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
