import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockProducts = [
      {
        id: 1,
        name: 'Fresh Apples',
        price: 2.99,
        rating: 4.5,
        category: 'fruits',
        image: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
        deliveryTime: '30 min',
        stock: 10
      },
      {
        id: 2,
        name: 'Organic Bananas',
        price: 1.49,
        rating: 4.2,
        category: 'fruits',
        image: 'https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg',
        deliveryTime: '30 min',
        stock: 15
      },
      {
        id: 3,
        name: 'Whole Wheat Bread',
        price: 3.29,
        rating: 4.0,
        category: 'bakery',
        image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
        deliveryTime: '30 min',
        stock: 8
      },
      {
        id: 4,
        name: 'Organic Milk',
        price: 4.99,
        rating: 4.7,
        category: 'dairy',
        image: 'https://images.pexels.com/photos/221083/pexels-photo-221083.jpeg',
        deliveryTime: '30 min',
        stock: 12
      },
      {
        id: 5,
        name: 'Free Range Eggs',
        price: 5.49,
        rating: 4.3,
        category: 'dairy',
        image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
        deliveryTime: '30 min',
        stock: 20
      },
      {
        id: 6,
        name: 'Fresh Spinach',
        price: 2.29,
        rating: 4.1,
        category: 'vegetables',
        image: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg',
        deliveryTime: '30 min',
        stock: 5
      }
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
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-4">Groceries Delivered in 30 Minutes</h1>
          <p className="text-xl mb-6">Fresh products straight to your doorstep</p>
          <button className="btn-secondary">Shop Now</button>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-4 pb-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap ${selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    {product.deliveryTime}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon 
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn-primary text-sm px-3 py-1"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;