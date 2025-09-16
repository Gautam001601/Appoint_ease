import React, { useState } from 'react';
import { Search, Filter, Star, Calendar, Clock, MapPin, User, Stethoscope } from 'lucide-react';

const DoctorAppointmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  const specialties = [
    'All Specialties', 'Cardiology', 'Pediatrics', 'Dermatology', 
    'Orthopedics', 'Gynecology', 'Neurology', 'Psychiatry'
  ];

  const locations = [
    'All Locations', 'Downtown', 'North Area', 'South Area', 
    'East District', 'West District', 'Suburban'
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiologist',
      experience: '15 years',
      rating: 4.9,
      reviews: 342,
      fee: 800,
      location: 'Downtown',
      availability: 'Available Today',
      nextSlot: '2:30 PM',
      image: 'SJ'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      experience: '12 years',
      rating: 4.8,
      reviews: 298,
      fee: 600,
      location: 'North Area',
      availability: 'Available Today',
      nextSlot: '4:00 PM',
      image: 'MC'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Dermatologist',
      experience: '10 years',
      rating: 4.9,
      reviews: 256,
      fee: 750,
      location: 'South Area',
      availability: 'Available Tomorrow',
      nextSlot: '10:00 AM',
      image: 'ER'
    },
    {
      id: 4,
      name: 'Dr. David Kumar',
      specialty: 'Orthopedic',
      experience: '18 years',
      rating: 4.7,
      reviews: 412,
      fee: 900,
      location: 'East District',
      availability: 'Available Today',
      nextSlot: '6:30 PM',
      image: 'DK'
    },
    {
      id: 5,
      name: 'Dr. Lisa Thompson',
      specialty: 'Gynecologist',
      experience: '14 years',
      rating: 4.8,
      reviews: 389,
      fee: 850,
      location: 'West District',
      availability: 'Available Today',
      nextSlot: '3:15 PM',
      image: 'LT'
    },
    {
      id: 6,
      name: 'Dr. James Wilson',
      specialty: 'Neurologist',
      experience: '20 years',
      rating: 4.9,
      reviews: 456,
      fee: 1000,
      location: 'Downtown',
      availability: 'Available Tomorrow',
      nextSlot: '11:30 AM',
      image: 'JW'
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    return (
      (searchTerm === '' || 
       doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedSpecialty === '' || selectedSpecialty === 'All Specialties' || 
       doctor.specialty === selectedSpecialty) &&
      (selectedLocation === '' || selectedLocation === 'All Locations' || 
       doctor.location === selectedLocation)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Doctor <span className="text-blue-600">Appointment</span>
          </h1>
          <p className="text-xl text-gray-600">
            Find and book appointments with top-rated doctors near you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties, or symptoms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Specialty Filter */}
            <div>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-blue-600">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredDoctors.map(doctor => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-6">
                {/* Doctor Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-blue-600 font-bold text-lg">{doctor.image}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{doctor.name}</h3>
                      <p className="text-blue-600 font-semibold">{doctor.specialty}</p>
                      <p className="text-gray-500">{doctor.experience} experience</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-gray-500 ml-1">({doctor.reviews})</span>
                    </div>
                    <p className="text-2xl font-bold text-green-600">₹{doctor.fee}</p>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{doctor.location}</span>
                  </div>
                  <div className="flex items-center text-green-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                {/* Next Available Slot */}
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Next Available Slot</p>
                      <p className="font-semibold text-blue-600">{doctor.nextSlot}</p>
                    </div>
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Book Appointment
                  </button>
                  <button className="px-4 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    <User className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
          </div>
        )}

        {/* Emergency Notice */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
          <div className="flex items-center justify-center text-red-700">
            <div className="bg-red-100 p-2 rounded-full mr-4">
              <span className="text-red-600 font-bold">!</span>
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-lg">Medical Emergency?</h4>
              <p className="text-red-600">For immediate medical attention, call our 24/7 emergency line: <span className="font-bold">1-800-EMERGENCY</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentsPage;