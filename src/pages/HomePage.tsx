import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Home as HomeIcon, 
  Pill, 
  FileText, 
  Clock, 
  Shield, 
  Users, 
  Star,
  Search,
  Phone,
  Truck,
  Stethoscope
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Health, <span className="text-green-300">Simplified</span>
              </h1>
              <p className="text-xl lg:text-2xl mb-8 text-blue-100">
                Book appointments, get home visits, order medicines with lightning-fast delivery, 
                and receive test reports in hours, not days.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link 
                  to="/doctor-appointments" 
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Appointment
                </Link>
                <Link 
                  to="/home-visit" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <HomeIcon className="mr-2 h-5 w-5" />
                  Request Home Visit
                </Link>
                <Link 
                  to="/pharmacy" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Pill className="mr-2 h-5 w-5" />
                  Order Medicines
                </Link>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
                  <Truck className="h-8 w-8 text-green-300 mb-2" />
                  <div className="text-lg font-semibold">10-20 Min</div>
                  <div className="text-blue-200">Medicine Delivery</div>
                </div>
                <div className="bg-blue-700 bg-opacity-50 p-4 rounded-lg">
                  <FileText className="h-8 w-8 text-green-300 mb-2" />
                  <div className="text-lg font-semibold">1-12 Hours</div>
                  <div className="text-blue-200">Test Reports</div>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="hidden lg:block">
              <div className="bg-blue-500 bg-opacity-30 rounded-2xl p-8 text-center">
                <Stethoscope className="h-32 w-32 text-white mx-auto mb-4" />
                <p className="text-blue-100">Professional Healthcare at Your Fingertips</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-white py-12 shadow-lg -mt-8 mx-4 lg:mx-8 rounded-2xl relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Find Your Doctor</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input 
                type="text" 
                placeholder="Search by doctor name, specialty, or location..."
                className="w-full px-6 py-4 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center">
              <Search className="mr-2 h-5 w-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Senior Discount Banner */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Special Care for Senior Citizens</h2>
            <p className="text-xl mb-6">Get 20% off on all services with our senior citizen discount</p>
            <div className="bg-white text-green-600 px-8 py-3 rounded-full inline-block font-bold text-lg">
              Use Code: SENIOR20
            </div>
            <p className="text-green-100 mt-4">*Valid for citizens above 65 years. Terms and conditions apply.</p>
          </div>
        </div>
      </section>

      {/* Key Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Key Services</h2>
            <p className="text-xl text-gray-600">Comprehensive healthcare solutions designed for your convenience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Service 1 */}
            <Link to="/doctor-appointments" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="bg-blue-100 p-3 rounded-full w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Online Consultations</h3>
              <p className="text-gray-600 mb-4">Book appointments with top-rated doctors across all specialties</p>
              <div className="flex items-center text-blue-600 font-medium">
                <span>Book Now</span>
                <span className="ml-2">→</span>
              </div>
            </Link>

            {/* Service 2 */}
            <Link to="/home-visit" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="bg-green-100 p-3 rounded-full w-fit mb-4 group-hover:bg-green-200 transition-colors">
                <HomeIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Doctor Home Visits</h3>
              <p className="text-gray-600 mb-4">Experienced doctors visit your home for consultations and check-ups</p>
              <div className="flex items-center text-green-600 font-medium">
                <span>Request Visit</span>
                <span className="ml-2">→</span>
              </div>
            </Link>

            {/* Service 3 */}
            <Link to="/pharmacy" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="bg-orange-100 p-3 rounded-full w-fit mb-4 group-hover:bg-orange-200 transition-colors">
                <Pill className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Pharmacy</h3>
              <p className="text-gray-600 mb-4">Get medicines delivered to your doorstep in just 10-20 minutes</p>
              <div className="flex items-center text-orange-600 font-medium">
                <span>Order Now</span>
                <span className="ml-2">→</span>
              </div>
            </Link>

            {/* Service 4 */}
            <Link to="/diagnostic" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow group">
              <div className="bg-purple-100 p-3 rounded-full w-fit mb-4 group-hover:bg-purple-200 transition-colors">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quick Diagnostics</h3>
              <p className="text-gray-600 mb-4">Book tests and get reports delivered within 1-12 hours</p>
              <div className="flex items-center text-purple-600 font-medium">
                <span>Book Test</span>
                <span className="ml-2">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Doctors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Rated Doctors</h2>
            <p className="text-xl text-gray-600">Meet our experienced healthcare professionals</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Doctor 1 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-blue-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Sarah Johnson</h3>
              <p className="text-gray-600 mb-2">Cardiologist • 15 years exp.</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-600">4.9</span>
              </div>
              <p className="text-blue-600 font-semibold">₹800 / consultation</p>
            </div>

            {/* Doctor 2 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-green-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Michael Chen</h3>
              <p className="text-gray-600 mb-2">Pediatrician • 12 years exp.</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-600">4.8</span>
              </div>
              <p className="text-green-600 font-semibold">₹600 / consultation</p>
            </div>

            {/* Doctor 3 */}
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-purple-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Stethoscope className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Dr. Emily Rodriguez</h3>
              <p className="text-gray-600 mb-2">Dermatologist • 10 years exp.</p>
              <div className="flex justify-center items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
                <span className="ml-2 text-gray-600">4.9</span>
              </div>
              <p className="text-purple-600 font-semibold">₹750 / consultation</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/doctor-appointments" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              View All Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Appoint Ease?</h2>
            <p className="text-xl text-gray-300">We're committed to making healthcare accessible and convenient for everyone</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Clock className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Lightning Fast Service</h3>
              <p className="text-gray-300">From 10-minute medicine delivery to same-day test reports, we value your time.</p>
            </div>

            <div className="text-center">
              <Shield className="h-16 w-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">Trusted & Secure</h3>
              <p className="text-gray-300">Your health data is protected with bank-level security and HIPAA compliance.</p>
            </div>

            <div className="text-center">
              <Phone className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
              <p className="text-gray-300">Round-the-clock customer support for all your healthcare needs and emergencies.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;