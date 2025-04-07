import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaShoppingBasket, 
  FaUser, 
  FaSearch, 
  FaMapMarkerAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-gradient-to-r from-green-600 to-green-700 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-green-800 py-1 px-4 text-sm hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              Deliver to: <span className="font-semibold ml-1">New Delhi 110001</span>
            </span>
            <span>|</span>
            <span>Customer Service</span>
          </div>
          <div>
            <span>Download App</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Groozo
            </span>
            <span className="hidden md:block text-xs bg-white text-green-600 px-3 py-1 rounded-full font-bold shadow-sm">
              🚀 Express Delivery
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 mx-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for groceries, fruits, vegetables..."
                className="w-full px-5 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
                <FaSearch size={18} />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link 
              to="/auth" 
              className="hidden md:flex items-center space-x-1 hover:bg-green-800 px-3 py-2 rounded-lg transition-all"
            >
              <FaUser className="h-5 w-5" />
              <span className="font-medium">Login</span>
            </Link>
            <Link 
              to="/cart" 
              className="flex items-center space-x-1 hover:bg-green-800 px-3 py-2 rounded-lg transition-all relative"
            >
              <FaShoppingBasket className="h-5 w-5" />
              <span className="hidden md:inline font-medium">Cart</span>
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-green-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for groceries..."
              className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600">
              <FaSearch size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-green-700 p-4 rounded-lg mb-3">
            <div className="flex flex-col space-y-3">
              <Link to="/auth" className="flex items-center space-x-2 py-2">
                <FaUser />
                <span>Login</span>
              </Link>
              <div className="flex items-center space-x-2 py-2">
                <FaMapMarkerAlt />
                <span>Change Location</span>
              </div>
              <div className="pt-2 border-t border-green-600">
                <span className="font-medium">Categories</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
