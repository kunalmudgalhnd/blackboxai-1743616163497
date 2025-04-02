import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeStep === 3) {
      // Process payment and place order
      console.log('Order placed:', { ...formData, items: cartItems });
      clearCart();
      navigate('/order-confirmation');
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const steps = [
    { id: 1, name: 'Shipping', status: 'current' },
    { id: 2, name: 'Payment', status: 'upcoming' },
    { id: 3, name: 'Review', status: 'upcoming' }
  ];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="lg:col-span-1">
            <div className="mb-8">
              <nav className="flex items-center">
                <ol className="flex items-center space-x-4">
                  {steps.map((step, index) => (
                    <li key={step.id} className="flex items-center">
                      {activeStep > step.id ? (
                        <div className="flex items-center">
                          <span className="h-9 flex items-center">
                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary rounded-full">
                              <svg
                                className="w-5 h-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </span>
                          <span className="ml-4 text-sm font-medium text-gray-900">
                            {step.name}
                          </span>
                        </div>
                      ) : activeStep === step.id ? (
                        <div className="flex items-center">
                          <span className="h-9 flex items-center" aria-current="step">
                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-primary border-2 border-primary rounded-full">
                              <span className="h-2.5 w-2.5 bg-white rounded-full" />
                            </span>
                          </span>
                          <span className="ml-4 text-sm font-medium text-primary">
                            {step.name}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <span className="h-9 flex items-center">
                            <span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                              <span className="h-2.5 w-2.5 bg-transparent rounded-full" />
                            </span>
                          </span>
                          <span className="ml-4 text-sm font-medium text-gray-500">
                            {step.name}
                          </span>
                        </div>
                      )}
                      {index !== steps.length - 1 && (
                        <svg
                          className="h-5 w-5 text-gray-300 ml-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {activeStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        className="input-field"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Payment Method</h2>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="credit"
                        name="paymentMethod"
                        type="radio"
                        value="credit"
                        checked={formData.paymentMethod === 'credit'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="credit" className="ml-2 block text-sm font-medium text-gray-700">
                        Credit Card
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="paypal"
                        name="paymentMethod"
                        type="radio"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="paypal" className="ml-2 block text-sm font-medium text-gray-700">
                        PayPal
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="cash"
                        name="paymentMethod"
                        type="radio"
                        value="cash"
                        checked={formData.paymentMethod === 'cash'}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary"
                      />
                      <label htmlFor="cash" className="ml-2 block text-sm font-medium text-gray-700">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>

                  {formData.paymentMethod === 'credit' && (
                    <div className="space-y-4 mt-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          required
                          placeholder="1234 5678 9012 3456"
                          className="input-field"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="cardExpiry" className="block text-sm font-medium text-gray-700">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="cardExpiry"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            required
                            placeholder="MM/YY"
                            className="input-field"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardCvc" className="block text-sm font-medium text-gray-700">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cardCvc"
                            name="cardCvc"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            required
                            placeholder="123"
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-medium">Review Your Order</h2>
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p>{formData.firstName} {formData.lastName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.zipCode}</p>
                    <p>{formData.email}</p>
                    <p>{formData.phone}</p>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-medium mb-2">Payment Method</h3>
                    <p>{formData.paymentMethod === 'credit' ? 'Credit Card' : 
                        formData.paymentMethod === 'paypal' ? 'PayPal' : 'Cash on Delivery'}</p>
                    {formData.paymentMethod === 'credit' && (
                      <p>Card ending in {formData.cardNumber.slice(-4)}</p>
                    )}
                  </div>
                  <div className="bg-white rounded-lg shadow p-4">
                    <h3 className="font-medium mb-2">Order Summary</h3>
                    <div className="space-y-2">
                      {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between">
                          <span>{item.name} × {item.quantity}</span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>$2.99</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(cartTotal * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium mt-2">
                        <span>Total</span>
                        <span>${(cartTotal + 2.99 + (cartTotal * 0.08)).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setActiveStep(prev => prev - 1)}
                    className="btn-secondary"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  type="submit"
                  className="btn-primary"
                >
                  {activeStep === 3 ? 'Place Order' : 'Continue'}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1 lg:ml-8 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center">
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-gray-500 text-sm">${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>$2.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                  <span>Total</span>
                  <span>${(cartTotal + 2.99 + (cartTotal * 0.08)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;