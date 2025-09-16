import React, { useState } from 'react';
import { 
  User, Calendar, Clock, FileText, Pill, Home, 
  Settings, Bell, Download, Phone,
  Activity, TrendingUp, Users, Star
} from 'lucide-react';

const DashboardPage = () => {
  const [userRole, setUserRole] = useState('patient'); // patient, doctor, admin
  const [activeTab, setActiveTab] = useState('overview');

  // Sample data
  const patientData = {
    upcomingAppointments: [
      { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiology', date: '2025-01-05', time: '2:30 PM', type: 'In-person' },
      { id: 2, doctor: 'Dr. Michael Chen', specialty: 'Pediatrics', date: '2025-01-07', time: '10:00 AM', type: 'Home Visit' }
    ],
    recentOrders: [
      { id: 1, type: 'Medicine', items: 'Paracetamol, Vitamin D3', amount: 175, status: 'Delivered', date: '2025-01-02' },
      { id: 2, type: 'Test', items: 'Blood Test Package', amount: 2500, status: 'Report Ready', date: '2025-01-01' }
    ],
    testReports: [
      { id: 1, test: 'Complete Blood Count', date: '2025-01-01', status: 'Ready', doctor: 'Dr. Sarah Johnson' },
      { id: 2, test: 'Lipid Profile', date: '2024-12-28', status: 'Ready', doctor: 'Dr. Michael Chen' }
    ]
  };

  const doctorData = {
    todayAppointments: 8,
    totalPatients: 342,
    monthlyEarnings: 125000,
    rating: 4.9,
    upcomingAppointments: [
      { id: 1, patient: 'John Doe', time: '2:30 PM', type: 'Consultation' },
      { id: 2, patient: 'Jane Smith', time: '3:15 PM', type: 'Follow-up' },
      { id: 3, patient: 'Bob Johnson', time: '4:00 PM', type: 'Home Visit' }
    ]
  };

  const renderPatientDashboard = () => (
    <div className="space-y-8">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <Calendar className="h-8 w-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-blue-900">2</div>
          <div className="text-blue-600">Upcoming Appointments</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <Pill className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-green-900">5</div>
          <div className="text-green-600">Active Prescriptions</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl">
          <FileText className="h-8 w-8 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-purple-900">12</div>
          <div className="text-purple-600">Test Reports</div>
        </div>
        <div className="bg-orange-50 p-6 rounded-xl">
          <Home className="h-8 w-8 text-orange-600 mb-2" />
          <div className="text-2xl font-bold text-orange-900">3</div>
          <div className="text-orange-600">Home Visits</div>
        </div>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {patientData.upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.doctor}</h3>
                  <p className="text-gray-600">{appointment.specialty}</p>
                  <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  appointment.type === 'Home Visit' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {appointment.type}
                </span>
                <div className="mt-2">
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3">Type</th>
                <th className="text-left py-3">Items</th>
                <th className="text-left py-3">Amount</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {patientData.recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.type === 'Medicine' 
                        ? 'bg-orange-100 text-orange-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {order.type}
                    </span>
                  </td>
                  <td className="py-3">{order.items}</td>
                  <td className="py-3 font-medium">₹{order.amount}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 text-gray-600">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Reports */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Test Reports</h2>
        <div className="space-y-4">
          {patientData.testReports.map(report => (
            <div key={report.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-purple-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">{report.test}</h3>
                  <p className="text-gray-600">Ordered by {report.doctor}</p>
                  <p className="text-sm text-gray-500">{report.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  {report.status}
                </span>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDoctorDashboard = () => (
    <div className="space-y-8">
      {/* Doctor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <Calendar className="h-8 w-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-blue-900">{doctorData.todayAppointments}</div>
          <div className="text-blue-600">Today's Appointments</div>
        </div>
        <div className="bg-green-50 p-6 rounded-xl">
          <Users className="h-8 w-8 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-green-900">{doctorData.totalPatients}</div>
          <div className="text-green-600">Total Patients</div>
        </div>
        <div className="bg-purple-50 p-6 rounded-xl">
          <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-purple-900">₹{doctorData.monthlyEarnings.toLocaleString()}</div>
          <div className="text-purple-600">Monthly Earnings</div>
        </div>
        <div className="bg-yellow-50 p-6 rounded-xl">
          <Star className="h-8 w-8 text-yellow-600 mb-2" />
          <div className="text-2xl font-bold text-yellow-900">{doctorData.rating}</div>
          <div className="text-yellow-600">Average Rating</div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          {doctorData.upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center">
                <Clock className="h-6 w-6 text-blue-600 mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
                  <p className="text-gray-600">{appointment.type}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">{appointment.time}</div>
                <button className="text-green-600 hover:text-green-700 font-medium">
                  Start Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors">
          <Calendar className="h-8 w-8 mb-2" />
          <div className="font-semibold">Manage Schedule</div>
        </button>
        <button className="bg-green-600 text-white p-6 rounded-xl hover:bg-green-700 transition-colors">
          <FileText className="h-8 w-8 mb-2" />
          <div className="font-semibold">Patient Records</div>
        </button>
        <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors">
          <Activity className="h-8 w-8 mb-2" />
          <div className="font-semibold">Analytics</div>
        </button>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8">
      <div className="text-center py-12">
        <Settings className="h-24 w-24 text-gray-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">Admin Dashboard</h2>
        <p className="text-gray-600">System management and analytics coming soon</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your health overview.</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Role Switcher (for demo purposes) */}
            <select 
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="patient">Patient View</option>
              <option value="doctor">Doctor View</option>
              <option value="admin">Admin View</option>
            </select>
            <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
            <Settings className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800" />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {['overview', 'appointments', 'orders', 'reports', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Dashboard Content */}
        <div>
          {activeTab === 'overview' && (
            <>
              {userRole === 'patient' && renderPatientDashboard()}
              {userRole === 'doctor' && renderDoctorDashboard()}
              {userRole === 'admin' && renderAdminDashboard()}
            </>
          )}
          
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointments</h2>
              <p className="text-gray-600">Manage all your appointments here.</p>
            </div>
          )}
          
          {activeTab === 'orders' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Order History</h2>
              <p className="text-gray-600">View your medicine and test orders.</p>
            </div>
          )}
          
          {activeTab === 'reports' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Medical Reports</h2>
              <p className="text-gray-600">Access all your test reports and medical documents.</p>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Settings</h2>
              <p className="text-gray-600">Manage your account information and preferences.</p>
            </div>
          )}
        </div>

        {/* Emergency Contact */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mt-8">
          <div className="flex items-center justify-center text-red-700">
            <Phone className="h-8 w-8 text-red-600 mr-4" />
            <div className="text-center">
              <h4 className="font-semibold text-lg">Need Emergency Help?</h4>
              <p className="text-red-600">Call our 24/7 helpline: <span className="font-bold">1-800-EMERGENCY</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;