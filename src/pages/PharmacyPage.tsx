import React, { useState } from 'react';
import { Upload, Truck, Clock, Shield, Search, Plus, Minus, ShoppingCart, MapPin } from 'lucide-react';

const PharmacyPage = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [cart, setCart] = useState([]);

  const popularMedicines = [
    { id: 1, name: 'Paracetamol 500mg', price: 25, category: 'Pain Relief', inStock: true },
    { id: 2, name: 'Crocin Advance', price: 45, category: 'Fever', inStock: true },
    { id: 3, name: 'Vitamin D3', price: 150, category: 'Supplements', inStock: true },
    { id: 4, name: 'Cough Syrup', price: 85, category: 'Cold & Cough', inStock: true },
    { id: 5, name: 'Antiseptic Cream', price: 60, category: 'First Aid', inStock: true },
    { id: 6, name: 'Multivitamin', price: 200, category: 'Supplements', inStock: false }
  ];

  const categories = [
    'All Categories', 'Pain Relief', 'Fever', 'Supplements', 
    'Cold & Cough', 'First Aid', 'Diabetes Care', 'Heart Care'
  ];

  const addToCart = (medicine) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item => 
          item.id === medicine.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...medicine, quantity: 1 }];
    });
  };

  const updateQuantity = (id, change) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Online <span className="text-orange-600">Pharmacy</span>
          </h1>
          <p className="text-xl text-gray-600">
            Get medicines delivered to your doorstep in just 10-20 minutes
          </p>
        </div>

        {/* Key Features Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-12 w-12 mb-2" />
              <h3 className="text-xl font-bold">10-20 Minutes</h3>
              <p className="text-orange-100">Lightning Fast Delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 mb-2" />
              <h3 className="text-xl font-bold">100% Genuine</h3>
              <p className="text-orange-100">Authentic Medicines Only</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 mb-2" />
              <h3 className="text-xl font-bold">24/7 Available</h3>
              <p className="text-orange-100">Round-the-clock Service</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-lg mb-8">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                    activeTab === 'upload'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Upload Prescription
                </button>
                <button
                  onClick={() => setActiveTab('browse')}
                  className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                    activeTab === 'browse'
                      ? 'text-orange-600 border-b-2 border-orange-600'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Browse Medicines
                </button>
              </div>

              <div className="p-8">
                {activeTab === 'upload' ? (
                  /* Upload Prescription Tab */
                  <div className="text-center">
                    <Upload className="h-24 w-24 text-orange-300 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Upload Your Prescription</h3>
                    <p className="text-gray-600 mb-8">
                      Upload a clear photo of your prescription and we'll prepare your order
                    </p>
                    
                    <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 mb-6">
                      <div className="space-y-4">
                        <Upload className="h-16 w-16 text-orange-400 mx-auto" />
                        <div>
                          <p className="text-gray-700 font-medium">Click to upload or drag and drop</p>
                          <p className="text-gray-500 text-sm">PNG, JPG, PDF up to 10MB</p>
                        </div>
                        <button className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors">
                          Choose File
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-blue-800 mb-2">Tips for Clear Prescription Photos:</h4>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li>• Ensure good lighting</li>
                        <li>• Keep the prescription flat and straight</li>
                        <li>• Make sure all text is clearly visible</li>
                        <li>• Include doctor's signature and stamp</li>
                      </ul>
                    </div>

                    <button className="w-full bg-orange-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors">
                      Upload & Continue
                    </button>
                  </div>
                ) : (
                  /* Browse Medicines Tab */
                  <div>
                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                          type="text"
                          placeholder="Search medicines..."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                      <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                        {categories.map(category => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Popular Medicines Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {popularMedicines.map(medicine => (
                        <div key={medicine.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{medicine.name}</h4>
                              <p className="text-sm text-gray-600">{medicine.category}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              medicine.inStock 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-orange-600">₹{medicine.price}</span>
                            <button
                              onClick={() => addToCart(medicine)}
                              disabled={!medicine.inStock}
                              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Cart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Your Cart ({cart.length})
              </h3>
              
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                <div className="space-y-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">₹{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center font-bold">
                      <span>Total: ₹{getCartTotal()}</span>
                    </div>
                    <button className="w-full bg-orange-600 text-white py-3 rounded-lg mt-4 hover:bg-orange-700 transition-colors">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Delivery Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Delivery Address
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter delivery address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-orange-700 text-sm font-medium">
                    ⚡ Expected delivery: 10-20 minutes
                  </p>
                  <p className="text-orange-600 text-xs mt-1">
                    Delivery fee: FREE for orders above ₹500
                  </p>
                </div>
              </div>
            </div>

            {/* Senior Discount */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-green-800 mb-2">Senior Citizen Discount</h3>
              <p className="text-green-700 text-sm mb-3">
                Get 20% off on all medicines for customers aged 65+
              </p>
              <div className="bg-white p-2 rounded text-center">
                <code className="text-green-600 font-bold">SENIOR20</code>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-800 mb-2">Need Help?</h3>
              <p className="text-red-700 text-sm mb-3">
                For urgent medicine requirements or queries
              </p>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                Call 24/7 Pharmacy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyPage;