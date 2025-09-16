import React from 'react';
import { Heart, Users, Globe, Award, Target, Eye } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Appoint Ease</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make healthcare accessible, convenient, and affordable for everyone, 
            especially our senior citizens who deserve the best care.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Target className="h-12 w-12 text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              To revolutionize healthcare delivery by providing a comprehensive platform that connects 
              patients with quality medical services, ensuring fast, reliable, and affordable healthcare 
              solutions for all age groups, with special emphasis on senior citizen care.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Eye className="h-12 w-12 text-green-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              To become the most trusted healthcare platform globally, where every individual can access 
              quality medical care from the comfort of their home, with services delivered at unprecedented 
              speed and with utmost care and compassion.
            </p>
          </div>
        </div>

        {/* Key Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Heart className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Compassionate Care</h3>
              <p className="text-gray-600">Every interaction is guided by empathy and understanding</p>
            </div>

            <div className="text-center">
              <Users className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Patient First</h3>
              <p className="text-gray-600">Your health and satisfaction are our top priorities</p>
            </div>

            <div className="text-center">
              <Globe className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600">Making quality healthcare accessible to everyone, everywhere</p>
            </div>

            <div className="text-center">
              <Award className="h-16 w-16 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">Striving for the highest standards in everything we do</p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="mb-6">
              Appoint Ease was born from a simple observation: healthcare shouldn't be complicated. 
              Our founders, having experienced the challenges of navigating traditional healthcare systems, 
              envisioned a platform that would eliminate barriers and make quality medical care accessible to all.
            </p>
            <p className="mb-6">
              What started as a vision to simplify doctor appointments has evolved into a comprehensive 
              healthcare ecosystem. We've integrated cutting-edge technology with human-centered design 
              to create services that truly serve our patients' needs.
            </p>
            <p className="mb-6">
              Our commitment to senior citizens stems from recognizing that this demographic often faces 
              the greatest challenges in accessing healthcare. By offering special discounts and 
              user-friendly interfaces, we ensure that age is never a barrier to receiving quality care.
            </p>
            <p>
              Today, we're proud to serve thousands of patients across the region, delivering medicines 
              in minutes, providing test results in hours, and bringing doctors to homes when needed most. 
              But our journey is just beginning – we're constantly innovating to make healthcare even 
              more accessible and efficient.
            </p>
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Makes Us Different</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Speed & Efficiency</h3>
              <ul className="space-y-3 text-blue-700">
                <li>• 10-20 minute medicine delivery</li>
                <li>• 1-12 hour diagnostic reports</li>
                <li>• Same-day doctor consultations</li>
                <li>• Instant appointment confirmations</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-green-800 mb-4">Comprehensive Care</h3>
              <ul className="space-y-3 text-green-700">
                <li>• Online and offline consultations</li>
                <li>• Doctor home visit services</li>
                <li>• Full-service pharmacy</li>
                <li>• Complete diagnostic testing</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-purple-800 mb-4">Senior-Friendly</h3>
              <ul className="space-y-3 text-purple-700">
                <li>• 20% discount for senior citizens</li>
                <li>• Large, easy-to-read interface</li>
                <li>• Dedicated senior support line</li>
                <li>• Simplified booking process</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-orange-800 mb-4">Technology & Security</h3>
              <ul className="space-y-3 text-orange-700">
                <li>• HIPAA-compliant data protection</li>
                <li>• Secure payment processing</li>
                <li>• Real-time service tracking</li>
                <li>• 24/7 technical support</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Better Healthcare?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied patients who trust Appoint Ease for their healthcare needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;