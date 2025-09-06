import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ScrollToTop from "./components/auth/ScrollToTop";
import ProtectedRoute from './components/auth/ProtectedRoute';

// Lazy load pages for better performance
const HomePage = React.lazy(() => import('./pages/home/HomePage'));
const ExplorePage = React.lazy(() => import('./pages/explore/ExplorePage'));
const ItineraryPage = React.lazy(() => import('./pages/itinerary/ItineraryPage'));
const VisaAssistPage = React.lazy(() => import('./pages/visa/VisaAssistPage'));

const CommunityPage = React.lazy(() => import('./pages/community/CommunityPage'));
const SafetyPage = React.lazy(() => import('./pages/safety/SafetyPage'));
const ContactPage = React.lazy(() => import('./pages/admin/ContactPage'));
const LoginPage = React.lazy(() => import('./pages/admin/LoginPage'));
const AdminPage = React.lazy(() => import('./pages/admin/AdminPage'));
const NotFoundPage = React.lazy(() => import('./pages/admin/NotFoundPage'));

function App() {
  return (
    <Router>
      <Layout>
        <React.Suspense fallback={<div className="container-custom py-20 text-center">Loading...</div>}>
          <ScrollToTop/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/itinerary" element={<ItineraryPage />} />
            <Route path="/visa-assist" element={<VisaAssistPage />} />

            <Route path="/community" element={<CommunityPage />} />
            <Route path="/safety" element={<SafetyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </React.Suspense>
      </Layout>
    </Router>
  );
}

export default App;
