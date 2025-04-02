import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChartBarIcon,
  ShoppingBagIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    newCustomers: 0,
    activeProducts: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setStats({
          totalOrders: 142,
          totalRevenue: 12543.67,
          newCustomers: 24,
          activeProducts: 56
        });

        setRecentOrders([
          {
            id: 'GROZO-1001',
            customer: 'John Doe',
            date: new Date(Date.now() - 1000 * 60 * 60 * 2),
            amount: 42.97,
            status: 'delivered'
          },
          {
            id: 'GROZO-1002',
            customer: 'Jane Smith',
            date: new Date(Date.now() - 1000 * 60 * 60 * 5),
            amount: 35.50,
            status: 'shipped'
          },
          {
            id: 'GROZO-1003',
            customer: 'Robert Johnson',
            date: new Date(Date.now() - 1000 * 60 * 60 * 10),
            amount: 78.20,
            status: 'processing'
          },
          {
            id: 'GROZO-1004',
            customer: 'Emily Davis',
            date: new Date(Date.now() - 1000 * 60 * 60 * 24),
            amount: 29.99,
            status: 'delivered'
          },
          {
            id: 'GROZO-1005',
            customer: 'Michael Wilson',
            date: new Date(Date.now() - 1000 * 60 * 60 * 48),
            amount: 65.75,
            status: 'cancelled'
          }
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-primary bg-opacity-10 text-primary">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                    <p className="text-2xl font-semibold">{stats.totalOrders}</p>
                    <p className="text-sm flex items-center text-green-600">
                      <ArrowUpIcon className="h-4 w-4" />
                      <span>12% from last month</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-secondary bg-opacity-10 text-secondary">
                    <CurrencyDollarIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-semibold">${stats.totalRevenue.toFixed(2)}</p>
                    <p className="text-sm flex items-center text-green-600">
                      <ArrowUpIcon className="h-4 w-4" />
                      <span>8% from last month</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-accent bg-opacity-10 text-accent">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">New Customers</p>
                    <p className="text-2xl font-semibold">{stats.newCustomers}</p>
                    <p className="text-sm flex items-center text-green-600">
                      <ArrowUpIcon className="h-4 w-4" />
                      <span>5% from last month</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Products</p>
                    <p className="text-2xl font-semibold">{stats.activeProducts}</p>
                    <p className="text-sm flex items-center text-red-600">
                      <ArrowDownIcon className="h-4 w-4" />
                      <span>2% from last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${order.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/admin/orders/${order.id}`} className="text-primary hover:text-primary-dark">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link 
                to="/admin/products" 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <ShoppingBagIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Manage Products</h3>
                    <p className="text-sm text-gray-500">Add, edit or remove products</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/admin/users" 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">Manage Users</h3>
                    <p className="text-sm text-gray-500">View and manage user accounts</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/admin/analytics" 
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                    <ChartBarIcon className="h-6 w-6" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium">View Analytics</h3>
                    <p className="text-sm text-gray-500">Sales and performance metrics</p>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;