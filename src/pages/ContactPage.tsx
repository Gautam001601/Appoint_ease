import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    category: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      details: '+1-800-APPOINT',
      description: 'Round-the-clock assistance for emergencies and urgent queries',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'hello@appointease.com',
      description: 'Get detailed responses within 2-4 hours',
      color: 'green'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      details: 'Available 6 AM - 12 AM',
      description: 'Instant help from our customer support team',
      color: 'purple'
    },
    {
      icon: Headphones,
      title: 'WhatsApp Support',
      details: '+1-555-WHATSAPP',
      description: 'Quick assistance via WhatsApp messaging',
      color: 'orange'
    }
  ];

  const officeLocations = [
    {
      city: 'New York',
      address: '123 Healthcare Avenue, Medical District, NY 10001',
      phone: '+1-800-NY-HEALTH',
      hours: 'Mon-Fri: 8 AM - 8 PM, Sat-Sun: 9 AM - 6 PM'
    },
    {
      city: 'Los Angeles',
      address: '456 Wellness Boulevard, Health Quarter, LA 90210',
      phone: '+1-800-LA-HEALTH',
      hours: 'Mon-Fri: 8 AM - 8 PM, Sat-Sun: 9 AM - 6 PM'
    },
    {
      city: 'Chicago',
      address: '789 Medical Center Drive, Healthcare Hub, Chicago 60601',
      phone: '+1-800-CHI-HEALTH',
      hours: 'Mon-Fri: 8 AM - 8 PM, Sat-Sun: 9 AM - 6 PM'
    }
  ];

  const faqCategories = [
    {
      category: 'Appointments',
      questions: [
        'How to book a doctor appointment?',
        'Can I reschedule my appointment?',
        'What if I need an emergency consultation?'
      ]
    },
    {
      category: 'Home Visits',
      questions: [
        'Which doctors are available for home visits?',
        'How much does a home visit cost?',
        'What areas do you cover for home visits?'
      ]
    },
    {
      category: 'Pharmacy',
      questions: [
        'How fast is the medicine delivery?',
        'Do you deliver prescription medicines?',
        'What payment methods do you accept?'
      ]
    },
    {
      category: 'Diagnostic Tests',
      questions: [
        'How quickly will I get my test reports?',
        'Do you provide home sample collection?',
        'Are your labs certified?'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Contact <span className="text-blue-600">Us</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with all your healthcare needs. Reach out to us anytime!
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  method.color === 'blue' ? 'bg-blue-100' :
                  method.color === 'green' ? 'bg-green-100' :
                  method.color === 'purple' ? 'bg-purple-100' :
                  'bg-orange-100'
                }`}>
                  <IconComponent className={`h-8 w-8 ${
                    method.color === 'blue' ? 'text-blue-600' :
                    method.color === 'green' ? 'text-green-600' :
                    method.color === 'purple' ? 'text-purple-600' :
                    'text-orange-600'
                  }`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
                <p className={`font-semibold mb-2 ${
                  method.color === 'blue' ? 'text-blue-600' :
                  method.color === 'green' ? 'text-green-600' :
                  method.color === 'purple' ? 'text-purple-600' :
                  'text-orange-600'
                }`}>
                  {method.details}
                </p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Inquiry Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  <option value="appointments">Appointments</option>
                  <option value="home-visits">Home Visits</option>
                  <option value="pharmacy">Pharmacy</option>
                  <option value="diagnostic">Diagnostic Tests</option>
                  <option value="billing">Billing & Payment</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please provide detailed information about your inquiry..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </button>
            </form>
          </div>

          {/* Office Locations */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Locations</h2>
              <div className="space-y-6">
                {officeLocations.map((location, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{location.city}</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                        <p className="text-gray-600 text-sm">{location.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <p className="text-gray-600 text-sm">{location.phone}</p>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-gray-400 mr-2 mt-0.5" />
                        <p className="text-gray-600 text-sm">{location.hours}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-800 mb-2">Medical Emergency?</h3>
              <p className="text-red-700 mb-4">
                For life-threatening emergencies, call 911 immediately. For urgent medical needs:
              </p>
              <div className="flex flex-col space-y-2">
                <a href="tel:1-800-EMERGENCY" className="bg-red-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Call Emergency Line: 1-800-EMERGENCY
                </a>
                <p className="text-red-600 text-xs text-center">Available 24/7 for urgent medical situations</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {faqCategories.map((category, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                <ul className="space-y-2">
                  {category.questions.map((question, qIndex) => (
                    <li key={qIndex}>
                      <button className="text-left text-sm text-blue-600 hover:text-blue-700 hover:underline">
                        {question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              View All FAQs
            </button>
          </div>
        </div>

        {/* Response Time Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mt-8">
          <div className="text-center">
            <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">Our Response Times</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-blue-700">
              <div>
                <div className="font-semibold">Phone Support</div>
                <div className="text-sm">Immediate assistance</div>
              </div>
              <div>
                <div className="font-semibold">Live Chat</div>
                <div className="text-sm">1-2 minutes response</div>
              </div>
              <div>
                <div className="font-semibold">Email Support</div>
                <div className="text-sm">2-4 hours response</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;