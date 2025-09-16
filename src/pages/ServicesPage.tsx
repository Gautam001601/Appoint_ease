import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Home, Pill, FileText, Clock, MapPin, Phone, Shield } from 'lucide-react';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare solutions designed to meet all your medical needs with speed, 
            convenience, and professional care.
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Doctor Appointments */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <Calendar className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">Doctor Appointments</h2>
              <p className="text-blue-100">Book consultations with top-rated doctors</p>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Same-Day Appointments</h4>
                    <p className="text-gray-600">Book and consult with doctors within hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Verified Doctors</h4>
                    <p className="text-gray-600">All doctors are licensed and experienced professionals</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Multiple Specialities</h4>
                    <p className="text-gray-600">Cardiology, Pediatrics, Dermatology, and more</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/doctor-appointments" 
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Home Visit Service */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <Home className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">Doctor Home Visits</h2>
              <p className="text-green-100">Doctors come to you for consultations</p>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Home className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Comfort of Home</h4>
                    <p className="text-gray-600">Receive medical care in familiar surroundings</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Flexible Scheduling</h4>
                    <p className="text-gray-600">Available 24/7 for emergency home visits</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-green-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Senior-Friendly</h4>
                    <p className="text-gray-600">Special care packages for elderly patients</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/home-visit" 
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Request Home Visit
              </Link>
            </div>
          </div>

          {/* Online Pharmacy */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <Pill className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">Online Pharmacy</h2>
              <p className="text-orange-100">Lightning-fast medicine delivery</p>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-orange-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">10-20 Minute Delivery</h4>
                    <p className="text-gray-600">Get medicines delivered super fast</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FileText className="h-5 w-5 text-orange-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Prescription Upload</h4>
                    <p className="text-gray-600">Simply upload your prescription and order</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-orange-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Genuine Medicines</h4>
                    <p className="text-gray-600">Only authentic medicines from licensed pharmacies</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/pharmacy" 
                className="block w-full bg-orange-600 text-white text-center py-3 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Order Medicines
              </Link>
            </div>
          </div>

          {/* Diagnostic Tests */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
              <FileText className="h-12 w-12 text-white mb-4" />
              <h2 className="text-2xl font-bold text-white">Diagnostic Tests</h2>
              <p className="text-purple-100">Quick test reports in hours</p>
            </div>
            <div className="p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-purple-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">1-12 Hour Reports</h4>
                    <p className="text-gray-600">Fastest test report turnaround time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Home className="h-5 w-5 text-purple-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">Home Sample Collection</h4>
                    <p className="text-gray-600">Trained technicians collect samples at home</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-purple-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-semibold">NABL Accredited Labs</h4>
                    <p className="text-gray-600">All tests processed in certified laboratories</p>
                  </div>
                </div>
              </div>
              <Link 
                to="/diagnostic" 
                className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
              >
                Book Diagnostic Test
              </Link>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Our Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">24/7 Availability</h3>
              <p className="text-gray-600">Round-the-clock services for all your healthcare emergencies and needs.</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Assured</h3>
              <p className="text-gray-600">All our services meet the highest quality standards and safety protocols.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-fit mx-auto mb-4">
                <Phone className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">Dedicated customer support team to assist you at every step.</p>
            </div>
          </div>
        </div>

        {/* Senior Citizen Special */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Special Care for Senior Citizens</h2>
          <p className="text-xl text-green-100 mb-6">
            We understand the unique healthcare needs of our elderly patients
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">20% Discount</h4>
              <p className="text-green-100">Special pricing on all services for seniors 65+</p>
            </div>
            <div className="bg-white bg-opacity-20 p-4 rounded-lg">
              <h4 className="font-semibold text-lg mb-2">Priority Booking</h4>
              <p className="text-green-100">Skip the queue with priority appointment slots</p>
            </div>
          </div>
          <div className="bg-white text-green-600 px-8 py-3 rounded-full inline-block font-bold text-lg">
            Use Code: SENIOR20
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;