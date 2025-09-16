import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DoctorAppointmentsPage from './pages/DoctorAppointmentsPage';
import HomeVisitPage from './pages/HomeVisitPage';
import PharmacyPage from './pages/PharmacyPage';
import DiagnosticPage from './pages/DiagnosticPage';
import PricingPage from './pages/PricingPage';
import DashboardPage from './pages/DashboardPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/doctor-appointments" element={<DoctorAppointmentsPage />} />
              <Route path="/home-visit" element={<HomeVisitPage />} />
              <Route path="/pharmacy" element={<PharmacyPage />} />
              <Route path="/diagnostic" element={<DiagnosticPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;