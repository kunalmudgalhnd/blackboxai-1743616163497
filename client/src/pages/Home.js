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

  const shopCategories = [
    { id: 1, name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716' },
    { id: 2, name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150' },
    { id: 3, name: 'Meat & Fish', image: 'https://images.unsplash.com/photo-1608500218807-3702595a3a20' },
    { id: 4, name: 'Bakery', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff' },
    { id: 5, name: 'Beverages', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7' },
    { id: 6, name: 'Snacks', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150' },
  ];

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
        {/* Vibrant Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 h-64 md:h-[500px] shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-green-600 to-green-700 opacity-80"></div>
          <img 
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc" 
            alt="Groceries"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center px-8 md:px-16">
            <div className="max-w-2xl text-center mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-100">
                  Fresh Groceries
                </span><br/>
                Delivered in 30 Minutes
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Farm-fresh produce • Premium quality • Lightning fast delivery
              </p>
              <div className="flex gap-4 justify-center">
                <Link 
                  to="/products" 
                  className="bg-yellow-400 hover:bg-yellow-300 text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  Shop Now
                </Link>
                <Link 
                  to="/offers" 
                  className="bg-white/90 hover:bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg"
                >
                  Today's Offers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Colorful Categories Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-green-600 to-yellow-400 bg-clip-text text-transparent">
              Shop by Category
            </span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {shopCategories.map((category, index) => {
              const colors = [
                'from-green-400 to-green-600',
                'from-blue-400 to-blue-600', 
                'from-yellow-400 to-yellow-600',
                'from-red-400 to-red-600',
                'from-purple-400 to-purple-600',
                'from-pink-400 to-pink-600'
              ];
              return (
                <Link 
                  to={`/category/${category.id}`}
                  key={category.id}
                  className="group relative rounded-2xl overflow-hidden h-40 hover:-translate-y-2 transition-all duration-300 shadow-lg"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors[index]} opacity-90`}></div>
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-md">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
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