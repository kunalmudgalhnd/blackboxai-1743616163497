import React from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { 
    cartItems, 
    cartCount, 
    cartTotal,
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart();

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart ({cartCount})</h1>
        
        {cartCount === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-4">Start shopping to add items to your cart</p>
            <Link 
              to="/" 
              className="btn-primary inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4 flex">
                    <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-gray-500">${item.price.toFixed(2)}</p>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center mt-4">
                        <label htmlFor={`quantity-${item.id}`} className="mr-2">Qty:</label>
                        <select
                          id={`quantity-${item.id}`}
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                          className="border rounded p-1"
                        >
                          {[...Array(10).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                        
                        <div className="ml-auto font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="p-4 flex justify-end">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span>${(cartTotal * 0.08).toFixed(2)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${(cartTotal + 2.99 + (cartTotal * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
                
                <Link
                  to="/checkout"
                  className="btn-primary w-full mt-6 py-3 text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;