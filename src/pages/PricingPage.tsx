import React from 'react';
import { Check, Star, Users, Calendar, Home, Pill, FileText, Phone } from 'lucide-react';

const PricingPage = () => {
  const consultationPricing = [
    { specialty: 'General Medicine', fee: '₹500', experience: '8+ years' },
    { specialty: 'Cardiology', fee: '₹800', experience: '12+ years' },
    { specialty: 'Pediatrics', fee: '₹600', experience: '10+ years' },
    { specialty: 'Dermatology', fee: '₹750', experience: '9+ years' },
    { specialty: 'Orthopedics', fee: '₹900', experience: '15+ years' },
    { specialty: 'Gynecology', fee: '₹850', experience: '12+ years' },
    { specialty: 'Psychiatry', fee: '₹1000', experience: '14+ years' },
    { specialty: 'Neurology', fee: '₹1200', experience: '18+ years' }
  ];

  const homeVisitPricing = [
    { service: 'General Consultation', price: '₹1,500', includes: 'Doctor visit + Basic examination' },
    { service: 'Senior Citizen Visit', price: '₹1,200', includes: 'Specialized geriatric care + Health monitoring', discount: '20% OFF' },
    { service: 'Emergency Visit', price: '₹2,500', includes: '24/7 availability + Priority response' },
    { service: 'Follow-up Visit', price: '₹1,000', includes: 'Post-treatment check-up + Medication review' }
  ];

  const diagnosticPackages = [
    {
      name: 'Basic Health Checkup',
      originalPrice: '₹3,500',
      discountedPrice: '₹2,500',
      tests: 15,
      features: [
        'Complete Blood Count (CBC)',
        'Lipid Profile',
        'Liver Function Test',
        'Kidney Function Test',
        'Thyroid Function Test',
        'Diabetes Screening',
        'Home Sample Collection',
        'Digital Report in 6-8 hours'
      ]
    },
    {
      name: 'Comprehensive Package',
      originalPrice: '₹6,000',
      discountedPrice: '₹4,500',
      tests: 25,
      features: [
        'All Basic Tests',
        'Cardiac Risk Assessment',
        'Vitamin Profile',
        'Tumor Markers',
        'Bone Health Profile',
        'Complete Hormone Panel',
        'Priority Sample Collection',
        'Digital Report in 4-6 hours',
        'Free Doctor Consultation'
      ]
    },
    {
      name: 'Senior Citizen Special',
      originalPrice: '₹6,000',
      discountedPrice: '₹3,600',
      tests: 30,
      features: [
        'All Comprehensive Tests',
        'Geriatric Specific Tests',
        'Vision & Hearing Assessment',
        'Cognitive Function Tests',
        'Bone Density Screening',
        'Cardiovascular Risk Profile',
        'Free Home Collection',
        'Priority Report in 2-4 hours',
        'Free Follow-up Consultation',
        'Health Report Explanation'
      ],
      popular: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Transparent <span className="text-blue-600">Pricing</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quality healthcare with no hidden costs. All prices are upfront and competitive.
          </p>
        </div>

        {/* Senior Citizen Highlight */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8 mb-16">
          <div className="text-center">
            <Users className="h-16 w-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Senior Citizens Get Special Pricing!</h2>
            <p className="text-xl text-green-100 mb-6">
              20% discount on all services for citizens aged 65 and above
            </p>
            <div className="bg-white text-green-600 px-8 py-3 rounded-full inline-block font-bold text-2xl">
              Use Code: SENIOR20
            </div>
            <p className="text-green-100 mt-4 text-sm">
              *Valid on all services. Verification required during booking.
            </p>
          </div>
        </div>

        {/* Doctor Consultation Pricing */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Calendar className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Doctor Consultation Fees</h2>
            <p className="text-gray-600">Transparent pricing for all specializations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {consultationPricing.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.specialty}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">{item.fee}</div>
                <p className="text-gray-600 text-sm mb-4">{item.experience}</p>
                <div className="flex items-center text-yellow-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-gray-600 text-sm ml-2">4.8+ rating</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Home Visit Pricing */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Home className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Home Visit Services</h2>
            <p className="text-gray-600">Doctor consultations in the comfort of your home</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {homeVisitPricing.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 relative">
                {service.discount && (
                  <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {service.discount}
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.service}</h3>
                <div className="text-3xl font-bold text-green-600 mb-4">{service.price}</div>
                <p className="text-gray-600 mb-6">{service.includes}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Qualified doctor visit</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Complete health assessment</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span>Prescription & recommendations</span>
                  </li>
                  {service.service === 'Senior Citizen Visit' && (
                    <li className="flex items-center text-gray-700">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Specialized geriatric care</span>
                    </li>
                  )}
                </ul>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                  Schedule Visit
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pharmacy Pricing */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Pill className="h-16 w-16 text-orange-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pharmacy Services</h2>
            <p className="text-gray-600">Competitive medicine prices with ultra-fast delivery</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Medicine Delivery</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
                    <span><strong>10-20 minutes delivery</strong> - Fastest in the city</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
                    <span><strong>Free delivery</strong> on orders above ₹500</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
                    <span><strong>₹50 delivery charge</strong> for orders below ₹500</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
                    <span><strong>100% genuine medicines</strong> from licensed pharmacies</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-orange-500 mr-3" />
                    <span><strong>Prescription upload</strong> for easy ordering</span>
                  </li>
                  <li className="flex items-center text-gray-700">
                    <Check className="h-5 w-5 text-green-500 mr-3" />
                    <span><strong>Senior Citizens:</strong> 20% off with SENIOR20</span>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl">
                <h4 className="text-lg font-bold text-orange-800 mb-4">Sample Medicine Prices</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Paracetamol 500mg (10 tablets)</span>
                    <span className="font-medium">₹25</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Crocin Advance (15 tablets)</span>
                    <span className="font-medium">₹45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vitamin D3 (30 capsules)</span>
                    <span className="font-medium">₹150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cough Syrup (100ml)</span>
                    <span className="font-medium">₹85</span>
                  </div>
                </div>
                <p className="text-xs text-orange-600 mt-3">
                  *Prices may vary by brand and quantity
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Test Packages */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <FileText className="h-16 w-16 text-purple-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Diagnostic Test Packages</h2>
            <p className="text-gray-600">Comprehensive health checkups with rapid report delivery</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {diagnosticPackages.map((pkg, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${pkg.popular ? 'ring-4 ring-purple-200' : ''}`}>
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-6">
                    <span className="text-gray-500 line-through text-lg mr-2">{pkg.originalPrice}</span>
                    <span className="text-3xl font-bold text-purple-600">{pkg.discountedPrice}</span>
                    <p className="text-gray-600 mt-1">{pkg.tests} tests included</p>
                    {pkg.name === 'Senior Citizen Special' && (
                      <p className="text-green-600 font-medium text-sm mt-1">40% savings for seniors!</p>
                    )}
                  </div>
                  
                  <ul className="space-y-2 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    pkg.popular 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  }`}>
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Payment Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accepted Payment Methods</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Credit & Debit Cards (Visa, MasterCard, RuPay)</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>UPI (PhonePe, GooglePay, Paytm)</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Net Banking (All major banks)</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Cash on Delivery (Home visits & medicines)</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-green-500 mr-3" />
                  <span>Health Insurance (Cashless for eligible services)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Guarantees</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Razorpay secured payment gateway</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>256-bit SSL encryption</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>No transaction fees for patients</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>Instant refund on cancellations</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Check className="h-5 w-5 text-blue-500 mr-3" />
                  <span>100% money-back guarantee</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact for Queries */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 mt-8">
          <div className="text-center">
            <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-blue-900 mb-2">Have Questions About Pricing?</h3>
            <p className="text-blue-700 mb-4">
              Our customer support team is available 24/7 to help you understand our pricing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Call +1-800-PRICING
              </button>
              <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                Chat with Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;