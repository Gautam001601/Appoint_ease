import React, { useState } from 'react';
import { FileText, Clock, Home, Shield, Calendar, User, Search } from 'lucide-react';

const DiagnosticPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const testCategories = [
    'All Tests', 'Blood Tests', 'Radiology', 'Cardiology', 
    'Pathology', 'Women\'s Health', 'Complete Packages'
  ];

  const popularTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      category: 'Blood Tests',
      price: 400,
      reportTime: '2-4 hours',
      preparation: 'No fasting required',
      popular: true
    },
    {
      id: 2,
      name: 'Lipid Profile',
      category: 'Blood Tests',
      price: 800,
      reportTime: '4-6 hours',
      preparation: '12 hours fasting required',
      popular: true
    },
    {
      id: 3,
      name: 'Thyroid Function Test',
      category: 'Blood Tests',
      price: 650,
      reportTime: '6-8 hours',
      preparation: 'No fasting required',
      popular: true
    },
    {
      id: 4,
      name: 'X-Ray Chest',
      category: 'Radiology',
      price: 500,
      reportTime: '1-2 hours',
      preparation: 'No preparation needed',
      popular: false
    },
    {
      id: 5,
      name: 'ECG',
      category: 'Cardiology',
      price: 300,
      reportTime: '30 minutes',
      preparation: 'Wear loose clothing',
      popular: true
    },
    {
      id: 6,
      name: 'Diabetes Profile',
      category: 'Blood Tests',
      price: 1200,
      reportTime: '4-6 hours',
      preparation: '12 hours fasting required',
      popular: true
    }
  ];

  const healthPackages = [
    {
      id: 1,
      name: 'Basic Health Checkup',
      tests: 15,
      price: 2500,
      originalPrice: 3500,
      includes: ['CBC', 'Lipid Profile', 'Liver Function', 'Kidney Function', 'Thyroid']
    },
    {
      id: 2,
      name: 'Comprehensive Health Package',
      tests: 25,
      price: 4500,
      originalPrice: 6000,
      includes: ['All Basic Tests', 'Cardiac Profile', 'Diabetes Screen', 'Vitamin Profile']
    },
    {
      id: 3,
      name: 'Senior Citizen Package',
      tests: 30,
      price: 3600,
      originalPrice: 6000,
      includes: ['Comprehensive Tests', 'Bone Health', 'Vision Test', 'Hearing Test']
    }
  ];

  const timeSlots = [
    '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diagnostic <span className="text-purple-600">Tests</span>
          </h1>
          <p className="text-xl text-gray-600">
            Book diagnostic tests and get reports in 1-12 hours
          </p>
        </div>

        {/* Quick Features */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Clock className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-bold">1-12 Hours</h3>
              <p className="text-purple-100 text-sm">Quick Reports</p>
            </div>
            <div className="flex flex-col items-center">
              <Home className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-bold">Home Collection</h3>
              <p className="text-purple-100 text-sm">Free Service</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-bold">NABL Certified</h3>
              <p className="text-purple-100 text-sm">Trusted Labs</p>
            </div>
            <div className="flex flex-col items-center">
              <FileText className="h-12 w-12 mb-2" />
              <h3 className="text-lg font-bold">Digital Reports</h3>
              <p className="text-purple-100 text-sm">Download Anytime</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Packages */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Health Packages</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {healthPackages.map(pkg => (
                  <div key={pkg.id} className="border-2 border-gray-200 rounded-xl p-6 hover:border-purple-300 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
                        <p className="text-gray-600">{pkg.tests} tests included</p>
                      </div>
                      {pkg.name.includes('Senior') && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          40% OFF
                        </span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-purple-600">₹{pkg.price}</span>
                        <span className="text-gray-500 line-through">₹{pkg.originalPrice}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Includes:</p>
                      <div className="text-sm text-gray-700">
                        {pkg.includes.map((item, index) => (
                          <span key={index} className="inline-block bg-gray-100 px-2 py-1 rounded mr-2 mb-1">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                      Book Package
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Tests */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Individual Tests</h2>
              
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search tests..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {testCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tests Grid */}
              <div className="space-y-4">
                {popularTests.map(test => (
                  <div key={test.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900">{test.name}</h3>
                          {test.popular && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{test.category}</p>
                      </div>
                      <span className="text-xl font-bold text-purple-600">₹{test.price}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>Report in {test.reportTime}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>{test.preparation}</span>
                      </div>
                    </div>

                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                      Book Test
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="space-y-6">
            {/* Booking Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book Your Test</h3>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <input
                    type="text"
                    placeholder="Enter patient name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      placeholder="Age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                      <option>Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select 
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Address</label>
                  <textarea
                    rows={3}
                    placeholder="Enter complete address for sample collection"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="homeCollection"
                    className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="homeCollection" className="ml-2 text-sm text-gray-700">
                    Home sample collection (Free)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Schedule Test
                </button>
              </form>
            </div>

            {/* Senior Discount */}
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-green-800 mb-2 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Senior Citizen Benefits
              </h3>
              <div className="space-y-2 text-green-700">
                <p className="text-sm">• 20% discount on all tests</p>
                <p className="text-sm">• Priority home collection</p>
                <p className="text-sm">• Free health consultation</p>
              </div>
              <div className="bg-white p-2 rounded text-center mt-3">
                <code className="text-green-600 font-bold">SENIOR20</code>
              </div>
            </div>

            {/* Report Access */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-blue-800 mb-2">Access Your Reports</h3>
              <p className="text-blue-700 text-sm mb-4">
                Download your test reports anytime from our secure portal
              </p>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                View Reports
              </button>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 mt-8">
          <h3 className="text-lg font-bold text-yellow-800 mb-4">Important Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Sample Collection:</h4>
              <ul className="space-y-1">
                <li>• Home collection available 7 AM - 7 PM</li>
                <li>• Please be available at scheduled time</li>
                <li>• Follow fasting instructions if applicable</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Report Delivery:</h4>
              <ul className="space-y-1">
                <li>• Digital reports via email & SMS</li>
                <li>• Physical reports on request</li>
                <li>• Doctor consultation available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticPage;