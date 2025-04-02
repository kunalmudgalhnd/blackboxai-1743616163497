import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const OrderConfirmation = () => {
  return (
    <div className="py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-center">
            <CheckCircleIcon className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold mt-4">Order Confirmed!</h1>
          <p className="mt-2 text-lg text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          
          <div className="mt-8 bg-gray-50 rounded-lg p-6 text-left">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Order Number</h3>
                <p className="mt-1 text-sm text-gray-900">#GROZO-12345</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total</h3>
                <p className="mt-1 text-sm text-gray-900">$42.97</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Payment Method</h3>
                <p className="mt-1 text-sm text-gray-900">Credit Card</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900">
                Your order will be delivered within <span className="font-semibold">30 minutes</span> to:
              </p>
              <p className="mt-2 text-gray-900">
                123 Main Street<br />
                New York, NY 10001
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Link
              to="/"
              className="btn-primary inline-block px-8 py-3"
            >
              Continue Shopping
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Need help? <a href="#" className="text-primary hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;