import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from "./components/auth/ScrollToTop";
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import BlobCursor from './components/ui/BlobCursor';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const ExplorePage = React.lazy(() => import('./pages/explore/ExplorePage'));
const ItineraryPage = React.lazy(() => import('./pages/itinerary/ItineraryPage'));
const VisaAssistPage = React.lazy(() => import('./pages/visa/VisaAssistPage'));
const MarketplacePage = React.lazy(() => import('./pages/marketplace/MarketplacePage'));


const SafetyPage = React.lazy(() => import('./pages/safety/SafetyPage'));
const ContactPage = React.lazy(() => import('./pages/admin/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/login/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/auth/SignUpPage'));
const LandingPage = React.lazy(() => import('./pages/landing/LandingPage'));
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const BusinessmanDashboard = React.lazy(() => import('./pages/businessman/BusinessmanDashboard'));
const GuideDashboard = React.lazy(() => import('./pages/guide/GuideDashboard'));
const NotFoundPage = React.lazy(() => import('./pages/admin/NotFoundPage'));

function App() {
  return (
    <AuthProvider>
      <Router>
        <BlobCursor 
          blobType="circle"
          fillColor="#90EE90"
          trailCount={3}
          sizes={[30, 60, 45]}
          innerSizes={[10, 15, 12]}
          innerColor="rgba(255,255,255,0.8)"
          opacities={[0.6, 0.6, 0.6]}
          shadowColor="rgba(0,0,0,0.75)"
          shadowBlur={5}
          shadowOffsetX={10}
          shadowOffsetY={10}
          filterStdDeviation={30}
          useFilter={true}
          fastDuration={0.1}
          slowDuration={0.5}
          zIndex={100}
        />
        <Layout>
          <React.Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/itinerary" element={<ItineraryPage />} />
              <Route path="/marketplace/*" element={<MarketplacePage />} />
              <Route path="/visa-assist" element={<VisaAssistPage />} />
              <Route path="/safety" element={<SafetyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/businessman/dashboard" element={<ProtectedRoute><BusinessmanDashboard /></ProtectedRoute>} />
              <Route path="/guide/dashboard" element={<ProtectedRoute><GuideDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
