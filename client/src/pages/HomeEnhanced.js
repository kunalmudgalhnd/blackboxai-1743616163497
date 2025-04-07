import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const HomeEnhanced = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const shopCategories = [
    { id: 1, name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716', color: 'bg-green-100' },
    { id: 2, name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', color: 'bg-blue-100' },
    { id: 3, name: 'Meat & Fish', image: 'https://images.unsplash.com/photo-1608500218807-3702595a3a20', color: 'bg-red-100' },
    { id: 4, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff', color: 'bg-yellow-100' },
    { id: 5, name: 'Beverages', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7', color: 'bg-purple-100' },
    { id: 6, name: 'Snacks', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150', color: 'bg-orange-100' },
  ];

  useEffect(() => {
    // Mock data
    const mockProducts = [
      // ... existing product data ...
    ];
    setProducts(mockProducts);
    const uniqueCategories = ['all', ...new Set(mockProducts.map(p => p.category))];
    setCategories(uniqueCategories);
    setLoading(false);
  }, []);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Vibrant Hero Banner */}
      <div className="relative rounded-b-3xl overflow-hidden h-96 md:h-[500px] shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700 opacity-95"></div>
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e" 
          alt="Groceries"
          className="w-full h-full object-cover mix-blend-overlay"
        />
        <div className="absolute inset-0 flex items-center px-8 md:px-16">
          <div className="max-w-2xl text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
                Fresh Groceries
              </span><br/>
              Delivered in 30 Minutes
            </h1>
            <p className="text-xl text-green-100 mb-8 max-w-lg">
              Get farm-fresh fruits, organic vegetables and premium groceries delivered lightning fast
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link 
                to="/products" 
                className="bg-yellow-400 hover:bg-yellow-300 text-green-800 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Shop Now
              </Link>
              <Link 
                to="/offers" 
                className="bg-white hover:bg-gray-100 text-green-700 font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
              >
                Today's Offers
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Colorful Categories */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {shopCategories.map(category => (
            <Link 
              to={`/category/${category.id}`} 
              key={category.id}
              className={`${category.color} rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2`}
            >
              <div className="p-4">
                <div className="bg-white rounded-xl p-2 mb-3 w-16 h-16 mx-auto flex items-center justify-center">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-center font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* ... existing product grid code ... */}
      </div>
    </div>
  );
};

export default HomeEnhanced;