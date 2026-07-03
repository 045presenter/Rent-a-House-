import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { SubscriptionAuthProvider } from './contexts/SubscriptionAuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import HomePage from './pages/HomePage.jsx';
import RentalsPage from './pages/RentalsPage.jsx';
import HostelsPage from './pages/HostelsPage.jsx';
import CommercialSpacesPage from './pages/CommercialSpacesPage.jsx';
import PropertyDetailPage from './pages/PropertyDetailPage.jsx';
import AboutUsPage from './pages/AboutUsPage.jsx';
import ContactUsPage from './pages/ContactUsPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignUpPage.jsx';
import TenantProfilePage from './pages/TenantProfilePage.jsx';
import LandlordDashboardPage from './pages/LandlordDashboardPage.jsx';
import PlansPage from './pages/PlansPage.jsx';
import SubscriptionsPage from './pages/SubscriptionsPage.jsx';
import { LOGIN_PATH, PLANS_PATH, MANAGE_PATH } from './config/subscriptionRoutes.js';

function App() {
  return (
    <AuthProvider>
      <SubscriptionAuthProvider>
        <Router>
          <ScrollToTop />
          <Toaster position="top-right" richColors />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rentals" element={<RentalsPage />} />
            <Route path="/hostels" element={<HostelsPage />} />
            <Route path="/commercial" element={<CommercialSpacesPage />} />
            <Route path="/property/:id" element={<PropertyDetailPage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/contact" element={<ContactUsPage />} />
            <Route path={LOGIN_PATH} element={<LoginPage />} />
            <Route path="/auth" element={<SignupPage />} />
            <Route
              path="/tenant/profile"
              element={
                <ProtectedRoute requiredRole="tenant">
                  <TenantProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/landlord/dashboard"
              element={
                <ProtectedRoute requiredRole="landlord">
                  <LandlordDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path={PLANS_PATH} element={<PlansPage />} />
            <Route
              path={MANAGE_PATH}
              element={
                <ProtectedRoute>
                  <SubscriptionsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </SubscriptionAuthProvider>
    </AuthProvider>
  );
}

export default App;
