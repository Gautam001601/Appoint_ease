import React, { useState } from 'react';
import { Home, Clock, Shield, User, Phone, MapPin, Calendar, CheckCircle, X } from 'lucide-react';
import { supabaseService } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

const HomeVisitPage = () => {
  const { user } = useAuth();
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    patientEmail: '',
    address: '',
    reason: ''
  });

  const specialties = [
    { name: 'General Medicine', available: true, description: 'For common health issues, check-ups, and consultations' },
    { name: 'Pediatrics', available: true, description: 'Child healthcare and pediatric consultations' },
    { name: 'Cardiology', available: true, description: 'Heart-related consultations and check-ups' },
    { name: 'Geriatrics', available: true, description: 'Specialized care for senior citizens' },
    { name: 'Dermatology', available: true, description: 'Skin-related issues and consultations' },
    { name: 'Physiotherapy', available: true, description: 'Physical therapy and rehabilitation' },
    { name: 'Orthopedics', available: false, description: 'Currently available only at clinic' },
    { name: 'Neurology', available: false, description: 'Available for follow-up consultations only' }
  ];

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to book a home visit');
      return;
    }

    if (!selectedSpecialty) {
      alert('Please select a specialty');
      return;
    }

    try {
      await supabaseService.bookAppointment({
        patient_id: user.id,
        appointment_type: 'home_visit',
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        patient_name: bookingForm.patientName,
        patient_age: bookingForm.patientAge ? parseInt(bookingForm.patientAge) : undefined,
        patient_gender: bookingForm.patientGender,
        patient_phone: bookingForm.patientPhone,
        patient_email: bookingForm.patientEmail,
        address: bookingForm.address,
        specialty: selectedSpecialty,
        reason: bookingForm.reason
      });

      setBookingSuccess(true);
      setBookingForm({
        patientName: '',
        patientAge: '',
        patientGender: '',
        patientPhone: '',
        patientEmail: '',
        address: '',
        reason: ''
      });
      setSelectedSpecialty('');
      setSelectedDate('');
      setSelectedTime('');

      setTimeout(() => {
        setBookingSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error booking home visit:', error);
      alert('Failed to book home visit. Please try again.');
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Doctor <span className="text-green-600">Home Visits</span>
          </h1>
          <p className="text-xl text-gray-600">
            Quality healthcare in the comfort of your home
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Booking Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Request Home Visit</h2>
            
            <form className="space-y-6" onSubmit={handleSubmitBooking}>
              {/* Patient Information */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                <input
                  type="text"
                  required
                  value={bookingForm.patientName}
                  onChange={(e) => setBookingForm({...bookingForm, patientName: e.target.value})}
                  placeholder="Enter patient's full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={bookingForm.patientAge}
                    onChange={(e) => setBookingForm({...bookingForm, patientAge: e.target.value})}
                    placeholder="Age"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={bookingForm.patientGender}
                    onChange={(e) => setBookingForm({...bookingForm, patientGender: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={bookingForm.patientPhone}
                    onChange={(e) => setBookingForm({...bookingForm, patientPhone: e.target.value})}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={bookingForm.patientEmail}
                    onChange={(e) => setBookingForm({...bookingForm, patientEmail: e.target.value})}
                    placeholder="email@example.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address</label>
                <textarea
                  rows={3}
                  required
                  value={bookingForm.address}
                  onChange={(e) => setBookingForm({...bookingForm, address: e.target.value})}
                  placeholder="Enter your complete address including apartment/house number, street, area, and landmarks"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>

              {/* Specialty Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Required Specialty</label>
                <select 
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select Specialty</option>
                  {specialties.filter(s => s.available).map(specialty => (
                    <option key={specialty.name} value={specialty.name}>
                      {specialty.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                  <select
                    required
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select Time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reason for Visit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <textarea
                  rows={3}
                  value={bookingForm.reason}
                  onChange={(e) => setBookingForm({...bookingForm, reason: e.target.value})}
                  placeholder="Brief description of health concern or reason for consultation"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                ></textarea>
              </div>

              {/* Senior Citizen Discount */}
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="seniorCitizen"
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="seniorCitizen" className="ml-3 text-sm font-medium text-green-800">
                    Patient is 65+ years old (Get 20% discount with code SENIOR20)
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Request Home Visit - ₹1,500
              </button>
            </form>

            {bookingSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center text-green-800">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-semibold">Home visit booked successfully! You will receive a notification shortly.</span>
                </div>
              </div>
            )}
          </div>

          {/* Information Panel */}
          <div className="space-y-8">
            {/* How it Works */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Home Visits Work</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Book Your Visit</h4>
                    <p className="text-gray-600">Fill out the form with patient details and preferred time</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Doctor Assignment</h4>
                    <p className="text-gray-600">We assign a qualified doctor based on your requirements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Consultation at Home</h4>
                    <p className="text-gray-600">Doctor visits your home for thorough consultation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Follow-up Care</h4>
                    <p className="text-gray-600">Prescription and follow-up instructions provided</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Available Specialties */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Available Specialties</h3>
              <div className="space-y-3">
                {specialties.map(specialty => (
                  <div key={specialty.name} className="flex items-start justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4 className="font-semibold">{specialty.name}</h4>
                        {specialty.available ? (
                          <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                        ) : (
                          <Clock className="h-5 w-5 text-gray-400 ml-2" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{specialty.description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      specialty.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {specialty.available ? 'Available' : 'Limited'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6">Why Choose Home Visits?</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Home className="h-6 w-6 mr-3" />
                  <span>Comfort and convenience of your home</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 mr-3" />
                  <span>Qualified and experienced doctors</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 mr-3" />
                  <span>Flexible scheduling including weekends</span>
                </div>
                <div className="flex items-center">
                  <User className="h-6 w-6 mr-3" />
                  <span>Personalized one-on-one consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Note */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-12">
          <div className="flex items-center justify-center text-red-700">
            <Phone className="h-8 w-8 text-red-600 mr-4" />
            <div className="text-center">
              <h4 className="font-semibold text-lg">Medical Emergency?</h4>
              <p className="text-red-600">For life-threatening emergencies, call 911 immediately. For urgent medical needs, call our 24/7 hotline: <span className="font-bold">1-800-URGENT</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeVisitPage;