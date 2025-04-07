import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const ProfessionalHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Enhanced color scheme
  const categoryColors = [
    'bg-gradient-to-br from-emerald-400 to-emerald-600',
    'bg-gradient-to-br from-blue-400 to-blue-600',
    'bg-gradient-to-br from-amber-400 to-amber-600',
    'bg-gradient-to-br from-rose-400 to-rose-600',
    'bg-gradient-to-br from-violet-400 to-violet-600',
    'bg-gradient-to-br from-cyan-400 to-cyan-600'
  ];

  // ... [rest of component code with professional animations and design]

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
    >
      {/* Professional Hero Section */}
      <motion.section 
        variants={itemVariants}
        className="relative h-screen max-h-[800px] overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
            alt="Premium Groceries"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6">
            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-amber-300">
                Gourmet Groceries
              </span><br/>
              Delivered to Your Door
            </motion.h1>
            
            <motion.p
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 mb-8 max-w-2xl"
            >
              Premium quality ingredients, hand-selected and delivered with care
            </motion.p>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/products"
                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/90 hover:bg-white text-gray-900 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-center"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Professional Categories Section */}
      <motion.section 
        variants={containerVariants}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
              Our Categories
            </span>
          </motion.h2>

          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {categoryColors.map((color, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
                className={`${color} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300`}
              >
                <div className="p-8 h-64 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">Category {index + 1}</h3>
                  <p className="text-white/90 mb-4">Premium quality selections</p>
                  <Link 
                    to={`/category/${index}`}
                    className="text-white font-medium hover:underline"
                  >
                    Explore →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Professional Products Section */}
      <motion.section
        variants={containerVariants}
        className="py-16 bg-gray-50"
      >
        <div className="container mx-auto px-6">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-500">
              Featured Products
            </span>
          </motion.h2>

          {/* Product grid with professional cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[1, 2, 3, 4].map((product, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={`https://source.unsplash.com/random/300x300?food=${index}`}
                    alt={`Product ${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 text-emerald-600 px-3 py-1 rounded-full text-sm font-bold shadow">
                    New
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Product {index}</h3>
                  <div className="flex items-center mb-3">
                    <div className="flex text-amber-400">
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                      <StarIcon className="h-5 w-5" />
                    </div>
                    <span className="text-gray-500 text-sm ml-2">(24)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">$9.99</span>
                    <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-full transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default ProfessionalHome;