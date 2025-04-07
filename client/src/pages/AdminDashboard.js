import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  FiUsers, FiPackage, FiDollarSign, FiShoppingCart,
  FiBarChart2, FiSettings, FiLogOut
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
    }
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/v1/admin/dashboard', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-green-700 text-white p-4">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <FiBarChart2 className="mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${activeTab === 'products' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <FiPackage className="mr-3" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${activeTab === 'users' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <FiUsers className="mr-3" />
            Users
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${activeTab === 'orders' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <FiShoppingCart className="mr-3" />
            Orders
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center w-full p-3 rounded-lg mb-2 ${activeTab === 'settings' ? 'bg-green-600' : 'hover:bg-green-600'}`}
          >
            <FiSettings className="mr-3" />
            Settings
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="flex items-center w-full p-3 rounded-lg mt-8 hover:bg-green-600"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <FiUsers size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold">{stats.users}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <FiPackage size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Products</p>
                    <p className="text-2xl font-bold">{stats.products}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                    <FiShoppingCart size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Orders</p>
                    <p className="text-2xl font-bold">{stats.orders}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <FiDollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold">${stats.revenue?.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;