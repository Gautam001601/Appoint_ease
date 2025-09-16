import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-full">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Appoint Ease</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Your trusted healthcare partner providing comprehensive medical services with convenience and care.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/doctor-appointments" className="text-gray-300 hover:text-white transition-colors">Book Appointment</Link></li>
              <li><Link to="/home-visit" className="text-gray-300 hover:text-white transition-colors">Home Visit</Link></li>
              <li><Link to="/pharmacy" className="text-gray-300 hover:text-white transition-colors">Pharmacy</Link></li>
              <li><Link to="/diagnostic" className="text-gray-300 hover:text-white transition-colors">Diagnostic Tests</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Online Consultations</li>
              <li className="text-gray-300">Doctor Home Visits</li>
              <li className="text-gray-300">10-20 Min Medicine Delivery</li>
              <li className="text-gray-300">1-12 Hour Test Reports</li>
              <li className="text-gray-300">Senior Citizen Discounts</li>
              <li className="text-gray-300">24/7 Emergency Support</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">+1-800-APPOINT</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">hello@appointease.com</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-blue-400 mr-3" />
                <span className="text-gray-300">Healthcare District, Medical City</span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-green-600 rounded-lg">
              <p className="text-white text-sm font-medium">
                Senior Citizens: Use code SENIOR20 for 20% off!
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Appoint Ease. All rights reserved. | 
            <Link to="/privacy" className="hover:text-white ml-2">Privacy Policy</Link> |
            <Link to="/terms" className="hover:text-white ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;