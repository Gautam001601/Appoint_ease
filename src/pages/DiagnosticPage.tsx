import React, { useState, useEffect } from 'react';
import { FileText, Clock, Home, Shield, Calendar, User, Search, CheckCircle, X } from 'lucide-react';
import { supabaseService, DiagnosticTest } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

const DiagnosticPage = () => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [diagnosticTests, setDiagnosticTests] = useState<DiagnosticTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    address: '',
    selectedTests: [] as string[]
  });

  useEffect(() => {
    loadDiagnosticTests();
  }, []);

  const loadDiagnosticTests = async () => {
    try {
      setLoading(true);
      const data = await supabaseService.getDiagnosticTests();
      setDiagnosticTests(data);
    } catch (error) {
      console.error('Error loading diagnostic tests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to book diagnostic tests');
      return;
    }

    try {
      await supabaseService.bookAppointment({
        patient_id: user.id,
        appointment_type: 'diagnostic',
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        patient_name: bookingForm.patientName,
        patient_age: bookingForm.patientAge ? parseInt(bookingForm.patientAge) : undefined,
        patient_gender: bookingForm.patientGender,
        patient_phone: bookingForm.patientPhone,
        address: bookingForm.address,
        reason: `Tests: ${bookingForm.selectedTests.join(', ')}`
      });

      setBookingSuccess(true);
      setBookingForm({
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientPhone: '',
        address: '',
        selectedTests: []
      });
      setSelectedDate('');
      setSelectedTime('');

      setTimeout(() => {
        setBookingSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error booking diagnostic test:', error);
      alert('Failed to book test. Please try again.');
    }
  };

  const testCategories = [
    'All Tests', 'Blood Tests', 'Radiology', 'Cardiology',
    'Pathology', 'Women\'s Health', 'Complete Packages'
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

  const filteredTests = diagnosticTests.filter(test => {
    return (
      selectedCategory === '' ||
      selectedCategory === 'All Tests' ||
      test.category === selectedCategory
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Diagnostic <span className="text-purple-600">Tests</span>
          </h1>
          <p className="text-xl text-gray-600">
            Book diagnostic tests and get reports in 1-12 hours
          </p>
        </div>

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
          <div className="lg:col-span-2 space-y-8">
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

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Individual Tests</h2>

              <div className="flex flex-col md:flex-row gap-4 mb-6">
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

              <div className="space-y-4">
                {filteredTests.map(test => (
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
                        <span>Report in {test.report_time}</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2" />
                        <span>{test.preparation || 'No preparation'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Book Your Test</h3>

              <form className="space-y-4" onSubmit={handleSubmitBooking}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={bookingForm.patientName}
                    onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                    placeholder="Enter patient name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                    <input
                      type="number"
                      value={bookingForm.patientAge}
                      onChange={(e) => setBookingForm({...bookingForm, patientAge: e.target.value})}
                      placeholder="Age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={bookingForm.patientGender}
                      onChange={(e) => setBookingForm({...bookingForm, patientGender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.patientPhone}
                    onChange={(e) => setBookingForm({...bookingForm, patientPhone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Collection Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select
                    required
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
                    required
                    value={bookingForm.address}
                    onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                    placeholder="Enter complete address for sample collection"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Schedule Test
                </button>

                {bookingSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center text-green-800">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      <span className="font-semibold">Test booked successfully! You will receive a notification shortly.</span>
                    </div>
                  </div>
                )}
              </form>
            </div>

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
          </div>
        </div>

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
